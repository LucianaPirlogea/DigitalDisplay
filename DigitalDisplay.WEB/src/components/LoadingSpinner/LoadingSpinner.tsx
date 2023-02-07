import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import { FC } from 'react';

interface Props {
  show: boolean;
}

export const LoadingSpinner: FC<Props> = ({ show }) => {
  const loadingStyle = {
    justifyContent: 'center',
    position: 'fixed',
    top: '60%',
  };
  const progressSize = 70;
  return (
    <Backdrop open={show} invisible={true}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress size={progressSize} />
        <Typography variant="h5" sx={loadingStyle}>
          Loading...
        </Typography>
      </Box>
    </Backdrop>
  );
};
