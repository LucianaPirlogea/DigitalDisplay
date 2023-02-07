import { Alert, Snackbar } from '@mui/material';
import { FC } from 'react';
import { SNACK_DURATION } from '../../services/variables';

interface Props {
  severityProp: boolean | undefined;
  textDisplay: string;
  openSnack: boolean;
  closeSnack: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}

export const ValidationSnack: FC<Props> = ({
  severityProp,
  textDisplay,
  openSnack,
  closeSnack,
}) => {
  const severityType = !severityProp ? 'success' : 'error';
  return (
    <Snackbar
      sx={{ width: '20%' }}
      open={openSnack}
      autoHideDuration={SNACK_DURATION}
      onClose={closeSnack}
    >
      <Alert
        severity={severityType}
        sx={{ width: '100%' }}
        onClose={closeSnack}
      >
        {textDisplay}
      </Alert>
    </Snackbar>
  );
};
