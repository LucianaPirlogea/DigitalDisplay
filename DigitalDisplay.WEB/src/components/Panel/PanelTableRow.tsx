import {
  Table,
  TableRow,
  TableCell,
  Button,
  TableBody,
  TableHead,
  Collapse,
  Box,
  IconButton,
  Typography,
  TableContainer,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FC, useCallback, useState } from 'react';
import {
  EditPanelInfo,
  PanelInfo,
  PanelInfoDevice,
} from '../../models/panelOverview';
import convertDate from '../../utils/dateConvert';
import { PopUpAssign } from '../AssignPanel';
import { DeviceInfo } from '../../models/deviceInfo';
import { devicePanel } from '../../models/devicesPanel';
import { removeDevicePanel } from '../../services';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal';
import EditPanelOverview from './EditPanelOverview';
import { updatePanel } from '../../services';
import { ActionsMenu } from '../ActionsMenu';
import { ValidationSnack } from '../Snackbars';

const PanelTableRow: FC<{
  panel: PanelInfo;
  onDelete: Function;
  onDuplicate: Function;
  devices: DeviceInfo[];
}> = ({ panel, onDelete, onDuplicate, devices }) => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalDevice, setShowModalDevice] = useState(false);
  const [devicePanelId, setDevicePanelId] = useState<number>(-1);
  const [devicesPanel, setDevicesPanel] = useState(panel.devices);
  const [namePanel, setNamePanel] = useState<string>(panel.name);
  const [severity, setSeverity] = useState<boolean>();
  const [displaySnack, setDisplaySnack] = useState<boolean>(false);
  const [displayText, setDisplayText] = useState<string>(' ');

  const getNewDevices = async (
    newDevices: devicePanel[],
    idsDevicesPanel: number[]
  ) => {
    let newDevicesPanel: PanelInfoDevice[] = [];
    for (let i = 0; i < newDevices.length; i++) {
      for (const device of devices) {
        if (newDevices[i].deviceId === device.id) {
          const newDevicePanel: PanelInfoDevice = {
            id: idsDevicesPanel[i],
            deviceId: device.id,
            name: device.name,
            location: device.location,
            startDateTime: newDevices[i].startDateTime,
          };

          newDevicesPanel.push(newDevicePanel);
        }
      }
    }
    setDevicesPanel([...devicesPanel, ...newDevicesPanel]);
    handleClose();
  };

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setDisplaySnack(false);
  };

  const deleteDevice = useCallback(
    async (devicePanelId: number) => {
      await removeDevicePanel(devicePanelId)
        .then(() => {
          const newData = devicesPanel.filter(
            (device) => device.id !== devicePanelId
          );
          setDevicesPanel([...newData]);
          setSeverity(false);
          setDisplayText('Device unassigned successfully');
          setDisplaySnack(true);
        })
        .catch(() => {
          setDisplaySnack(true);
          setSeverity(true);
          setDisplayText('Device could not be unassigned');
        });
    },
    [devicesPanel]
  );

  const updatePanelInfo = async (
    panelId: number,
    panelName: string
  ): Promise<void> => {
    const newPanelEdit: EditPanelInfo = {
      id: panelId,
      name: panelName,
    };
    await updatePanel(newPanelEdit);
    setNamePanel(panelName);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleCloseEdit = () => {
    setOpenDialogEdit(false);
  };

  const innerTableCols = ['Name', 'Location', 'Start Date', 'Actions'];

  const tableRowStyle = { paddingBottom: 0, paddingTop: 0 };
  const tableDevicesStyle = { maxHeight: '20rem' };
  const headerStyle = {
    '& .MuiTableCell-root': { backgroundColor: '#4a4a4a' },
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{namePanel}</TableCell>
        <TableCell align="center">{panel.panelLayoutName}</TableCell>
        <TableCell align="center">{panel.zoneCount}</TableCell>
        <TableCell align="center">
          <ActionsMenu
            onDeleteButton={() => setShowModal(true)}
            onEditButton={() => setOpenDialogEdit(true)}
            onDuplicateButton={() =>
              onDuplicate(panel.id, panel.panelLayoutName)
            }
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={tableRowStyle} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Devices
                <Button
                  onClick={() => setOpenDialog(true)}
                  variant="contained"
                  sx={{ marginLeft: '10px' }}
                  color="success"
                >
                  Assign
                </Button>
              </Typography>
              <TableContainer style={tableDevicesStyle}>
                <Table stickyHeader size="small" aria-label="purchases">
                  <TableHead sx={headerStyle} className="tableHeadSettings">
                    <TableRow>
                      {innerTableCols.map((field) => (
                        <TableCell
                          align="left"
                          key={field}
                          className="tableCell"
                        >
                          {field}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {devicesPanel.map((device: PanelInfoDevice) => (
                      <TableRow
                        key={
                          device.id.toString() + device.startDateTime.toString()
                        }
                      >
                        <TableCell component="th" scope="row" align="left">
                          {device.name}
                        </TableCell>
                        <TableCell align="left">{device.location}</TableCell>
                        <TableCell align="left">
                          {convertDate(device.startDateTime)}
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            onClick={() => {
                              setShowModalDevice(true);
                              setDevicePanelId(device.id);
                            }}
                            variant="contained"
                            sx={{ marginRight: '10px' }}
                            color="error"
                            className="buttonSettings"
                          >
                            Unassign
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <EditPanelOverview
        panelId={panel.id}
        panelName={panel.name}
        open={openDialogEdit}
        updatePanel={updatePanelInfo}
        close={handleCloseEdit}
      />
      <PopUpAssign
        panelId={panel.id}
        devices={devices}
        open={openDialog}
        close={handleClose}
        getNewDevices={getNewDevices}
      />
      <ValidationSnack
        severityProp={severity}
        textDisplay={displayText}
        openSnack={displaySnack}
        closeSnack={handleCloseSnack}
      />
      <DeleteConfirmationModal
        show={showModalDevice}
        close={() => setShowModalDevice(false)}
        onConfirmation={() => deleteDevice(devicePanelId)}
        delId={devicePanelId}
      />
      <DeleteConfirmationModal
        show={showModal}
        close={() => setShowModal(false)}
        onConfirmation={() => onDelete(panel.id)}
        delId={panel.id}
      />
    </>
  );
};

export default PanelTableRow;
