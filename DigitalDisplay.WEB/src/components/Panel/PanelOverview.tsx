import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { DeviceInfo } from '../../models/deviceInfo';
import { Link } from 'react-router-dom';
import { PanelInfo } from '../../models/panelOverview';
import { getDevices } from '../../services';
import { duplicatePanel, getPanels, removePanel } from '../../services';
import PanelTableRow from './PanelTableRow';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallBack } from '../ErrorHandling/ErrorSnack';
import { ValidationSnack } from '../Snackbars/ValidationSnack';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import {
  deleteAdvertisementContent,
  duplicateAdvertisementContentContent,
} from '../../api/UploadFile';

export const PanelOverview: FC = () => {
  const [panels, setPanels] = useState<PanelInfo[]>([]);
  const [devices, setDevices] = useState<DeviceInfo[]>([]);

  const [severity, setSeverity] = useState<boolean>();
  const [displaySnack, setDisplaySnack] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>(' ');
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setDisplaySnack(false);
  };

  const getDevice = useCallback(async () => {
    setIsLoading(true);
    const res = await getDevices();
    if (res) {
      setDevices(res);
    }
    return res;
  }, []);

  const getPanelData = useCallback(async () => {
    const res = await getPanels()
      .then((res) => {
        setPanels(res!);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return res;
  }, []);

  const deletePanel = useCallback(
    async (panelId: number) => {
      const panelToRemove = panels.find((p) => p.id === panelId);
      await removePanel(panelId)
        .then(() => {
          const newData = panels.filter((panel) => panel.id !== panelId);
          setPanels([...newData]);
          setSeverity(false);
          setDisplayText('Panel deleted successfully');
          setDisplaySnack(true);
        })
        .catch(() => {
          setDisplaySnack(true);
          setSeverity(true);
          setDisplayText('Panel could not be deleted');
        });
      if (panelToRemove?.backgroundImageFilename) {
        await deleteAdvertisementContent(
          panelToRemove?.backgroundImageFilename!
        );
      }
    },
    [panels]
  );

  const doublePanel = useCallback(
    async (panelId: number, panelLayoutName: string) => {
      const oldPanel = panels.find((p) => p.id === panelId);
      let panelNewName = null;
      if (oldPanel?.backgroundImageContent) {
        panelNewName = await duplicateAdvertisementContentContent(
          oldPanel?.backgroundImageFilename!
        );
      }
      const duplicatedPanel = (await duplicatePanel(panelId, panelNewName!))!;

      duplicatedPanel.panelLayoutName = panelLayoutName;
      setPanels([...panels, duplicatedPanel]);
    },
    [panels]
  );

  useEffect(() => {
    getPanelData();
    getDevice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableCols = ['Name', 'Layout', 'Number of zones', 'Actions'];

  const tableStyle = {
    minWidth: 700,
    maxHeight: 'calc(100vh - 170px)',
    marginTop: '10px',
  };

  const headerStyle = {
    '& .MuiTableCell-root': { backgroundColor: '#4a4a4a' },
  };

  const createPanel = { route: 'CreatePanel' };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallBack}>
      <div className="bodySettings">
        <Link style={{ textDecoration: 'none' }} to={`/${createPanel.route}`}>
          <Button variant="contained" color="success">
            Create
          </Button>
        </Link>
        <TableContainer component={Paper} sx={tableStyle}>
          <Table stickyHeader aria-label="customized table">
            <TableHead sx={headerStyle} className="tableHeadSettings">
              <TableRow>
                <TableCell align="center" className="tableCell" />
                {tableCols.map((field) => (
                  <TableCell key={field} className="tableCell" align="center">
                    {field}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {panels.map((panel) => (
                <PanelTableRow
                  panel={panel}
                  onDelete={deletePanel}
                  onDuplicate={doublePanel}
                  devices={devices}
                  key={panel.id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <LoadingSpinner show={isLoading} />
      </div>
      <ValidationSnack
        severityProp={severity}
        textDisplay={displayText}
        openSnack={displaySnack}
        closeSnack={handleCloseSnack}
      />
    </ErrorBoundary>
  );
};
