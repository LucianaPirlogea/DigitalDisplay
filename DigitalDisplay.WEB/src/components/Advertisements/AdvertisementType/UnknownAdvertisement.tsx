import { Container, Typography } from '@mui/material';
import { FC } from 'react';

export const UnkownAdvertisement: FC = () => {
  const containerStyle = {};
  return (
    <Container maxWidth="md" sx={containerStyle}>
      <Typography variant="h3">Please select an advertisement type.</Typography>
    </Container>
  );
};
