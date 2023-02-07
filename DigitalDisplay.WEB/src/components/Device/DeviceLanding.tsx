import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FC, useCallback, useEffect, useState } from 'react';
import { DeviceRow } from './DeviceRow';
import { DeviceInfo } from '../../models/deviceInfo';
import { getDevices } from '../../services';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export const DeviceLanding: FC = () => {
  const [devices, setDevices] = useState<DeviceInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getDevice = useCallback(async () => {
    setIsLoading(true);
    const res = await getDevices()
      .then((res) => {
        setDevices(res!);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return res;
  }, []);

  useEffect(() => {
    getDevice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    'Device name',
    'Location',
    'Currently running panel',
    'Last refresh',
  ];
  const tableStyle = {
    minWidth: 700,
    maxHeight: 'calc(100vh - 120px)',
    marginTop: '10px',
  };

  const headerStyle = {
    '& .MuiTableCell-root': { backgroundColor: '#4a4a4a' },
  };

  return (
    <div className="bodySettings">
      <TableContainer component={Paper} sx={tableStyle}>
        <Table stickyHeader aria-label="simple table">
          <TableHead sx={headerStyle} className="tableHeadSettings">
            <TableRow>
              {columns.map((column: string, index: number) => (
                <TableCell key={index} align="left" className="tableCell">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => (
              <DeviceRow key={device.id} device={device} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <LoadingSpinner show={isLoading} />
    </div>
  );
};
