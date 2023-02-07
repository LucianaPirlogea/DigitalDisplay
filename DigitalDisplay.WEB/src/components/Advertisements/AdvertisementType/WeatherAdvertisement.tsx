import { Button, Container, Grid } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router';
import { Advertisement } from '../../../models/advertisement';
import { addAdvertisement } from '../../../services';

interface Props {
  advertisementName: string;
  advertisementType: number;
  advertisementCategory: number;
}

export const WeatherAdvertisement: FC<Props> = ({
  advertisementName,
  advertisementType,
  advertisementCategory,
}) => {
  const containerStyle = {};
  const navigate = useNavigate();

  const gridElementSpace = 2;
  const lastGridStyle = {
    marginTop: '15px',
  };

  const saveAdvertisement = async (): Promise<void> => {
    const dataToSend: Advertisement = {
      name: advertisementName,
      advertisementTypeId: advertisementType,
      categoryId: advertisementCategory,
      createdDate: new Date(),
    };
    await addAdvertisement(dataToSend).then(() => {
      navigate('/AdvertisementList');
    });
  };

  return (
    <Container maxWidth="md" sx={containerStyle}>
      <Grid
        container
        spacing={gridElementSpace}
        alignItems="center"
        justifyContent="center"
        direction="row"
        sx={lastGridStyle}
      >
        <Button
          variant="contained"
          onClick={() => {
            saveAdvertisement();
          }}
        >
          Add Advertisement
        </Button>
      </Grid>
    </Container>
  );
};
