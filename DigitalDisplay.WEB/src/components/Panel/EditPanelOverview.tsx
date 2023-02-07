import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { FC, useState } from 'react';

interface Props {
  panelId: number;
  panelName: string;
  open: boolean;
  updatePanel: Function;
  close: () => void;
}

export const EditPanelOverview: FC<Props> = ({
  panelId,
  panelName,
  open,
  updatePanel,
  close,
}) => {
  const [textField, setTextField] = useState<string>(panelName);

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextField(event.target.value);
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
        <DialogTitle id="alert-dialog-title">{'Edit panel name'}</DialogTitle>
        <DialogContent>
          <DialogContentText component={'div'}>
            <TextField
              required
              style={{ marginTop: '10px' }}
              id="outlined-required"
              value={textField}
              onChange={handleText}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              close();
            }}
            variant="contained"
            color="error"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={async () => {
              updatePanel(panelId, textField);
              close();
            }}
            autoFocus
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditPanelOverview;
