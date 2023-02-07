import { Box, Button, Modal, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  show: boolean;
  close: () => void;
  onConfirmation: Function;
  delId: number;
}

export const DeleteConfirmationModal: FC<Props> = ({
  show,
  close,
  onConfirmation,
  delId,
}) => {
  const styleBox = {
    position: 'absolute' as 'absolute',
    top: '40%',
    bottom: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    minHeight: '10vh',
    backgroundColor: '#FFFFFF',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow:
      'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px',
    p: 4,
  };
  const buttonMargin = {
    marginRight: '20px',
  };
  const styleDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px',
  };

  const text1 = 'Confirmation';
  const text2 = 'Are you sure that you want to delete this?';

  function handleDelete() {
    onConfirmation(delId);
    close();
  }

  return (
    <>
      <Modal
        open={show}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true}
      >
        <Box
          sx={styleBox}
          display="block"
          justifyContent="center"
          alignItems="center"
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {text1}
          </Typography>
          <Typography id="modal-modal-description">{text2}</Typography>
          <div style={styleDiv}>
            <Button
              sx={buttonMargin}
              variant="contained"
              color="error"
              onClick={() => {
                handleDelete();
              }}
            >
              Delete
            </Button>
            <Button variant="contained" onClick={close}>
              Leave
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};
