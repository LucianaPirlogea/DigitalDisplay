import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import React from 'react';
import { FC, useState } from 'react';
import { DeviceInfo } from '../../models/deviceInfo';
import { assignDevicesPanel } from '../../services';
import { devicePanel } from '../../models/devicesPanel';
import DatePicker from 'react-datepicker';
import './PopUp.css';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  panelId: number;
  devices: DeviceInfo[];
  open: boolean;
  close: () => void;
  getNewDevices: Function;
}

export const PopUpAssign: FC<Props> = ({
  panelId,
  devices,
  open,
  close,
  getNewDevices,
}) => {
  const [checked, setChecked] = useState<Object>({});
  const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked({ ...checked, [event.target.name]: event.target.checked });
  };
  const [valueDate, setValueDate] = useState(new Date());

  const getNewDevicesPanels = (checked: Object) => {
    let newDevicesPanel: devicePanel[] = [];
    Object.entries(checked).forEach(([key, value], index) => {
      if (value === true) {
        const newDevicePanel: devicePanel = {
          deviceId: Number(key),
          panelId: panelId,
          startDateTime: valueDate,
        };
        newDevicesPanel.push(newDevicePanel);
      }
    });

    setChecked([]);
    return newDevicesPanel;
  };

  const assignDevicePanel = async () => {
    const devices: devicePanel[] = getNewDevicesPanels(checked);

    const res = await assignDevicesPanel(devices);
    return res;
  };

  const handleAssignButton = (): boolean => {
    let notCheck = true;
    if (Object.keys(checked).length === 0) {
      return true;
    }
    Object.entries(checked).forEach(([key, value], index) => {
      if (value === true) {
        notCheck = false;
      }
    });
    return notCheck;
  };

  const checkStyle = {
    marginBottom: '20px',
  };

  const popUpStyle = {
    maxHeight: '15rem',
  };

  return (
    <>
      <Dialog
        scroll={'paper'}
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Assign Device'}
          <DatePicker
            wrapperClassName="datePicker"
            selected={valueDate}
            onChange={(date: Date) => setValueDate(date)}
            showTimeSelect
            dateFormat="Pp"
          />
        </DialogTitle>
        <DialogContent style={popUpStyle}>
          <DialogContentText id="alert-dialog-description" component={'div'}>
            <FormControl>
              <FormGroup sx={checkStyle}>
                {devices.map((device: any) => (
                  <FormControlLabel
                    key={device.id}
                    control={
                      <Checkbox
                        onChange={handleChangeChecked}
                        name={device.id.toString()}
                      />
                    }
                    label={
                      device.name +
                      ' - ' +
                      device.location +
                      ' (' +
                      device.deviceUniqueId +
                      ')'
                    }
                  />
                ))}
              </FormGroup>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setChecked([]);
              close();
            }}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={async () => {
              const ids: number[] = (await assignDevicePanel())!;
              const result = getNewDevicesPanels(checked);
              getNewDevices(result, ids);
            }}
            disabled={handleAssignButton()}
            autoFocus
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
