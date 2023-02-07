import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  deleteAdvertisementContent,
  duplicateAdvertisementContentContent,
} from '../../api/UploadFile';
import { Advertisement } from '../../models/advertisement';
import {
  advertisementArchive,
  advertisementUnarchive,
  duplicateAdvertisement,
  getAdvertisements,
  removeAdvertisement,
} from '../../services';
import { updateAdvertisement } from '../../services/advertisements';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ValidationSnack } from '../Snackbars';
import { AdvertisementTable } from './AdvertisementTable';

export const AdvertisementList: FC = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [nonArchivedAds, setNonArchivedAds] = useState<Advertisement[]>([]); //TODO ;: remove
  const [isLoading, setIsLoading] = useState(false);

  const [severity, setSeverity] = useState<boolean>();
  const [displaySnack, setDisplaySnack] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>(' ');
  const [checkedArchived, setCheckedArchived] = useState<boolean>(true);

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setDisplaySnack(false);
  };

  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedArchived(event.target.checked);
  };

  const getAllAdvertisements = useCallback(async () => {
    setIsLoading(true);
    const res = await getAdvertisements()
      .then((res) => {
        setAds(res!);
        setNonArchivedAds(res!.filter((ad) => ad.archive !== true));
      })
      .finally(() => {
        setIsLoading(false);
      });
    return res;
  }, []);

  const duplicateAdvertisementData = useCallback(
    async (advertisementId: number) => {
      const duplicatedAdvertisement = (await duplicateAdvertisement(
        advertisementId
      ))!;
      if (duplicatedAdvertisement.graphicalContentFilename) {
        const fileName = await duplicateAdvertisementContentContent(
          duplicatedAdvertisement.graphicalContentFilename
        );
        duplicatedAdvertisement.graphicalContentFilename = fileName;
        await updateAdvertisement(
          duplicatedAdvertisement.id!,
          duplicatedAdvertisement
        );
      }
      setAds([duplicatedAdvertisement, ...ads]);
    },
    [ads]
  );

  const deleteAdvertisementData = useCallback(
    async (advertisementId: number) => {
      const removedEntity = ads.find((p) => p.id === advertisementId);
      await removeAdvertisement(advertisementId)
        .then(() => {
          const newData = ads.filter((ad) => ad.id !== advertisementId);
          setAds([...newData]);
          setSeverity(false);
          setDisplayText('Advertisement deleted successfully');
          setDisplaySnack(true);
        })
        .catch(() => {
          setDisplaySnack(true);
          setSeverity(true);
          setDisplayText('Advertisement could not be deleted');
        });

      await deleteAdvertisementContent(
        removedEntity?.graphicalContentFilename!
      );
    },
    [ads]
  );

  const archiveAd = async (advertisementId: number): Promise<void> => {
    await advertisementArchive(advertisementId);
    const newData = nonArchivedAds!.filter((ad) => ad.id !== advertisementId);
    setNonArchivedAds([...newData]);
  };

  const unarchiveAd = async (advertisementId: number): Promise<void> => {
    await advertisementUnarchive(advertisementId);
    const newData = ads!.filter((ad) => ad.id === advertisementId)[0];
    setNonArchivedAds([newData, ...nonArchivedAds!]);
  };

  const tableContainerStyle = {
    marginTop: '10px',
    maxHeight: 'calc(100vh - 170px)',
  };

  const stickyHeaderStyle = {
    '& .MuiTableCell-root': { backgroundColor: '#4a4a4a' },
  };

  const routeToCreate = 'AdsCreate';
  const styleText = {
    textDecoration: 'none',
  };

  const tableMinWidth = {
    minWidth: 750,
  };

  const tableRowTitle = [
    'Name',
    'Type',
    'Created By',
    'Created Date',
    'Used by zones',
    'Category',
    'Actions',
  ];
  useEffect(() => {
    getAllAdvertisements();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTableBody = (adsResult: Advertisement[]) => {
    return adsResult!.map((ad) => (
      <AdvertisementTable
        key={ad.id}
        advertisement={ad}
        onDuplicate={duplicateAdvertisementData}
        onDelete={deleteAdvertisementData}
        onArchive={archiveAd}
        onUnarchive={unarchiveAd}
      />
    ));
  };

  return (
    <div className="bodySettings">
      <LoadingSpinner show={isLoading} />
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Link to={`/${routeToCreate}`} style={styleText}>
            <Button variant="contained" color="success">
              Create
            </Button>
          </Link>
        </Grid>
        <Grid item xs={2}>
          <Box display="flex" justifyContent="flex-end">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked onChange={handleChecked} />}
                label="Include archived"
              />
            </FormGroup>
          </Box>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={tableContainerStyle}>
        <Table stickyHeader sx={tableMinWidth} aria-label="customized table">
          <TableHead className="tableHeadSettings" sx={stickyHeaderStyle}>
            <TableRow>
              {tableRowTitle.map((name) => (
                <TableCell align="center" className="tableCell">
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableBody(checkedArchived ? ads : nonArchivedAds)}
          </TableBody>
        </Table>
      </TableContainer>
      <ValidationSnack
        severityProp={severity}
        textDisplay={displayText}
        openSnack={displaySnack}
        closeSnack={handleCloseSnack}
      />
    </div>
  );
};
