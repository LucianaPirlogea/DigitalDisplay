import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { usePanelLayoutContext } from '../Contexts/PanelLayoutContext';
import { SaveConfirmationModal } from '../Modal/SaveConfirmationModal';

interface Props {
  formTitle: string;
  submitForm(): Promise<void>;
  withModal: boolean;
}

export const PanelLayoutForm: FC<Props> = ({
  formTitle,
  submitForm,
  withModal,
}) => {
  const { name, setName, description, setDescription } =
    usePanelLayoutContext();

  const [isFormValid, setIsFormValid] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const isEmptySpace = (str: string): boolean => str === '';

  const formStyle = {
    width: '50%',
    height: '100',
    margin: '30px auto',
    padding: '20px',
  };

  useEffect(() => {
    const validateForm = () => {
      const isNameInvalid = isEmptySpace(name);
      setIsFormValid(!isNameInvalid);
    };
    validateForm();
  }, [name]);

  return (
    <>
      <Grid container spacing={2} component={Paper} sx={formStyle}>
        <Grid item xs={12}>
          <Typography variant="h5">{formTitle}</Typography>
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            id="panelLayoutName"
            variant="standard"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            error={!isFormValid}
            helperText={!isFormValid ? 'Empty field!' : ''}
          />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="panelLayoutDescription"
            variant="standard"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <Button
            sx={{ ml: 8 }}
            variant="contained"
            color="success"
            type="submit"
            onClick={async () => {
              if (isFormValid) {
                if (withModal) {
                  setShowModal(true);
                } else {
                  await submitForm();
                  navigate('/PanelLayoutOverview');
                }
              }
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
      <SaveConfirmationModal
        show={showModal}
        close={() => setShowModal(false)}
        onConfirmation={submitForm}
        navigateTo={'/PanelLayoutOverview'}
      />
    </>
  );
};
