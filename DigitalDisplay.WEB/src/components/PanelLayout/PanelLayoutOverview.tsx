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
import { ErrorBoundary } from 'react-error-boundary';
import { Link } from 'react-router-dom';
import { PanelLayout } from '../../models/panelLayout';
import {
  duplicatePanelLayout,
  getPanelLayouts,
  removePanelLayout,
} from '../../services';
import { ErrorFallBack } from '../ErrorHandling/ErrorSnack';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { ValidationSnack } from '../Snackbars';
import PanelLayoutRow from './PanelLayoutRow';

export const PanelLayoutOverview: FC = () => {
  const [panelLayouts, setPanelLayouts] = useState<PanelLayout[]>([]);
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

  const getPanelLayout = useCallback(async () => {
    setIsLoading(true);
    const res = await getPanelLayouts()
      .then((res) => {
        setPanelLayouts(res!);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return res;
  }, []);

  const deletePanelLayout = useCallback(
    async (panelLayoutId: number) => {
      await removePanelLayout(panelLayoutId)
        .then(() => {
          const newData = panelLayouts.filter(
            (panelLayout) => panelLayout.id !== panelLayoutId
          );
          setPanelLayouts([...newData]);
          setSeverity(false);
          setDisplayText('Panel layout deleted successfully');
          setDisplaySnack(true);
        })
        .catch(() => {
          setDisplaySnack(true);
          setSeverity(true);
          setDisplayText('Panel could not be deleted');
        });
    },
    [panelLayouts]
  );

  const doublePanelLayout = useCallback(
    async (panelLayoutId: number) => {
      const duplicatedLayout = (await duplicatePanelLayout(panelLayoutId))!;
      setPanelLayouts([...panelLayouts, duplicatedLayout]);
    },
    [panelLayouts]
  );

  const createPanelLayoutObj = { route: 'CreatePanelLayout' };

  //Oppimization
  useEffect(() => {
    getPanelLayout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableStyle = {
    minWidth: 700,
    maxHeight: 'calc(100vh - 170px)',
    marginTop: '10px',
  };

  const headerStyle = {
    '& .MuiTableCell-root': { backgroundColor: '#4a4a4a' },
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallBack}>
      <div className="bodySettings">
        <Link
          style={{ textDecoration: 'none' }}
          to={`/${createPanelLayoutObj.route}`}
        >
          <Button variant="contained" color="success">
            Create
          </Button>
        </Link>

        <TableContainer component={Paper} sx={tableStyle}>
          <Table
            stickyHeader
            sx={{ minWidth: 700 }}
            aria-label="customized table"
          >
            <TableHead sx={headerStyle} className="tableHeadSettings">
              <TableRow>
                <TableCell className="tableCell" align="center">
                  Name
                </TableCell>
                <TableCell className="tableCell" align="center">
                  Number of panels
                </TableCell>
                <TableCell className="tableCell" align="center">
                  Number of zones
                </TableCell>
                <TableCell className="tableCell" align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <PanelLayoutRow
                layouts={panelLayouts}
                onDelete={deletePanelLayout}
                onDuplicate={doublePanelLayout}
              />
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
