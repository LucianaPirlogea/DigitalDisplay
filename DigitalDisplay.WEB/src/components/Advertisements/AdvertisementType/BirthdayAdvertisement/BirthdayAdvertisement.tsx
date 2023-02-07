import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getEmployees } from '../../../../api/employeesData';
import { Advertisement } from '../../../../models/advertisement';
import { addAdvertisement } from '../../../../services/advertisements';
import {
  IMAGE_OFFSET_LEFT,
  IMAGE_OFFSET_TOP,
  TEXT_OFFSET_LEFT,
  TEXT_OFFSET_TOP,
} from '../../../../services/variables';

import { EmployeesList } from './EmployeesList';

interface Props {
  advertisementName: string;
  advertisementType: number;
  advertisementCategory: number;
}

export const BirthdayAdvertisement: FC<Props> = ({
  advertisementName,
  advertisementType,
  advertisementCategory,
}) => {
  const navigate = useNavigate();

  const [textOffsetTop, setTextOffsetTop] = useState(TEXT_OFFSET_TOP);
  const [textOffsetLeft, setTextOffsetLeft] = useState(TEXT_OFFSET_LEFT);
  const [imageOffsetTop, setImageOffsetTop] = useState(IMAGE_OFFSET_TOP);
  const [imageOffsetLeft, setImageOffsetLeft] = useState(IMAGE_OFFSET_LEFT);
  const [employees, setEmployees] = useState([]);
  const [checkedEmployees, setCheckedEmployees] = useState([]);

  const getEmployeesData = useCallback(async () => {
    const res = await getEmployees();
    setEmployees(res);
  }, []);

  useEffect(() => {
    getEmployeesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gridElementSpace = 2;
  const lastGridStyle = {
    marginTop: '15px',
  };

  const saveAdvertisement = async (): Promise<void> => {
    const birthdayDataObj = {
      textOffset: {
        top: textOffsetTop,
        left: textOffsetLeft,
      },
      imageOffset: {
        top: imageOffsetTop,
        left: imageOffsetLeft,
      },
      employees: checkedEmployees,
    };
    const dataToSend: Advertisement = {
      name: advertisementName,
      advertisementTypeId: advertisementType,
      categoryId: advertisementCategory,
      createdDate: new Date(),
      birthdayData: JSON.stringify(birthdayDataObj),
    };
    await addAdvertisement(dataToSend).then(() => {
      navigate('/AdvertisementList');
    });
  };

  const gridSpace = 6;

  const customContainer = {
    backgroundColor: 'white',
    color: 'black',
    padding: '30px',
    border: '1px solid black',
    borderRadius: '6px',
    marginBottom: '10px',
  };

  const textFieldStyle = {
    ml: 1,
    mr: 1,
  };

  return (
    <Container maxWidth="md" sx={customContainer}>
      <Grid
        container
        spacing={gridElementSpace}
        alignItems="center"
        justifyContent="center"
        direction="row"
        sx={lastGridStyle}
      >
        <Grid
          item
          xs={gridSpace}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="subtitle1">Text offset:</Typography>

          <TextField
            label="Top"
            type="number"
            value={textOffsetTop}
            inputProps={{ min: 0, max: 200 }}
            size="small"
            sx={textFieldStyle}
            onChange={(e: any) => setTextOffsetTop(e.target.value)}
          />

          <TextField
            label="Left"
            type="number"
            value={textOffsetLeft}
            inputProps={{ min: 0, max: 200 }}
            size="small"
            sx={textFieldStyle}
            onChange={(e: any) => setTextOffsetLeft(e.target.value)}
          />
        </Grid>

        <Grid
          item
          xs={gridSpace}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="subtitle1">Image offset:</Typography>

          <TextField
            label="Top"
            type="number"
            value={imageOffsetTop}
            inputProps={{ min: 0, max: 200 }}
            size="small"
            sx={textFieldStyle}
            onChange={(e: any) => setImageOffsetTop(e.target.value)}
          />

          <TextField
            label="Left"
            type="number"
            value={imageOffsetLeft}
            inputProps={{ min: 0, max: 200 }}
            size="small"
            sx={textFieldStyle}
            onChange={(e: any) => setImageOffsetLeft(e.target.value)}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
          }}
        >
          <EmployeesList
            key={1}
            employees={employees}
            setEmployees={setEmployees}
            checkedEmployees={checkedEmployees}
            setCheckedEmployees={setCheckedEmployees}
            hasDatePicker={true}
          />
          <EmployeesList
            key={2}
            employees={employees}
            setEmployees={setEmployees}
            checkedEmployees={checkedEmployees}
            setCheckedEmployees={setCheckedEmployees}
            hasSearch={true}
          />
        </Grid>

        <Button
          variant="contained"
          onClick={() => {
            saveAdvertisement();
          }}
          sx={{ mt: 2 }}
        >
          Add Advertisement
        </Button>
      </Grid>
    </Container>
  );
};
