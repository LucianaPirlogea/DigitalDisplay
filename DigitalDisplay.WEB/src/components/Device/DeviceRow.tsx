import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';
import { FC } from 'react';
import { DeviceInfo } from '../../models/deviceInfo';
import convertDate from '../../utils/dateConvert';

export const DeviceRow: FC<{ device: DeviceInfo }> = ({ device }) => {
  const lastRefresh = moment().diff(device.latestRefresh, 'hours');
  const bgColor =
    lastRefresh < 1 ? 'none' : lastRefresh < 12 ? 'orange' : 'red';
  const tableCellStyle = {
    backgroundColor: bgColor,
  };
  const activePanelNameOrNone = device.activePanelName
    ? device.activePanelName
    : 'None';
  return (
    <TableRow>
      <TableCell>{device.name}</TableCell>
      <TableCell>{device.location}</TableCell>
      <TableCell>{activePanelNameOrNone}</TableCell>
      <TableCell sx={tableCellStyle}>
        {convertDate(device.latestRefresh)}
      </TableCell>
    </TableRow>
  );
};
