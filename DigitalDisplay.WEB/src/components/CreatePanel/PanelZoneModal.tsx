import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useContext, useState } from 'react';
import { Advertisement } from '../../models/advertisement';
import { PanelContext } from '../Contexts/PanelContext';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import {
  CARROUSEL_TYPE,
  NO_TYPE,
  SINGLE_TYPE,
  TILE_TYPE,
} from '../../services/variables';

export const PanelZoneModal: FC<{
  show: boolean;
  closeModal: Function;
  zoneNumber: number;
}> = ({ show, closeModal, zoneNumber }) => {
  const { updateZone, ads } = useContext(PanelContext);
  const [selectedType, setSelectedType] = useState<number>(NO_TYPE);
  const [selectedAddIds, setSelectedAddIds] = useState<number[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const adsStyle = {
    maxHeight: '300px',
    overflow: 'auto',
  };
  const buttonStyle = {
    marginRight: '10px',
  };

  const handleSelect = (adId: number) => {
    if (selectedType === SINGLE_TYPE) {
      if (selectedAddIds.length === 1) {
        return;
      }
    }
    setSelectedAddIds([...selectedAddIds, adId]);
  };

  const isSelected = (id: number) => {
    return selectedAddIds.includes(id);
  };

  const handleDeselect = (id: number) => {
    const newIds: number[] = selectedAddIds.filter((ad) => ad !== id);
    setSelectedAddIds([...newIds]);
  };

  const handleOnClick = () => {
    updateZone(zoneNumber, selectedType, selectedAddIds);
    setSelectedAddIds([]);
    setSelectedType(NO_TYPE);
    closeModal(false);
  };

  const filteredData = () => {
    const newAds: Advertisement[] = ads.filter((ad) => {
      if (searchValue.length === 0) {
        return ad;
      } else {
        return (
          ad.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          ad
            .advertisementType!.toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      }
    });

    return newAds;
  };
  const typeOptions = ['Single', 'Tile', 'Carrousel'];

  return (
    <Modal open={show}>
      <Grid container spacing={1} component={Paper} sx={style}>
        <Grid item xs={12}>
          <Typography variant="h6">Edit zone #{zoneNumber}</Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              variant="standard"
              defaultValue={zoneNumber}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">Zone number:</InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              select
              variant="standard"
              value={selectedType}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Zone type:</InputAdornment>
                ),
              }}
            >
              <MenuItem disabled value={NO_TYPE}>
                Select zone type
              </MenuItem>
              {typeOptions.map((type: string, index: number) => (
                <MenuItem
                  key={index}
                  value={index}
                  onClick={() => {
                    setSelectedType(index);
                    setSelectedAddIds([]);
                    setSearchValue('');
                  }}
                >
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
        {selectedType !== NO_TYPE && (
          <>
            <Grid item xs={6}>
              <Typography variant="h6">Choose advertisements</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                value={searchValue}
                placeholder="Search advertisement"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchValue(e.target.value)}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sx={adsStyle}>
              {filteredData().map((ad: Advertisement) =>
                (selectedType === TILE_TYPE ||
                  selectedType === CARROUSEL_TYPE) &&
                ad.advertisementType === 'Video' ? (
                  <span key={ad.id}></span>
                ) : (
                  <Card
                    key={ad.id}
                    variant="outlined"
                    sx={{
                      my: '10px',
                      border: isSelected(ad.id!) ? '1px green solid' : '',
                    }}
                    onClick={() => {
                      !isSelected(ad.id!) && handleSelect(ad.id!);
                    }}
                  >
                    <CardContent
                      key={ad.id}
                      sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        display: 'flex',
                      }}
                    >
                      <Typography>
                        {ad.name + ' - ' + ad.advertisementType}
                      </Typography>
                      {isSelected(ad.id!) && (
                        <ClearIcon onClick={() => handleDeselect(ad.id!)} />
                      )}
                    </CardContent>
                  </Card>
                )
              )}
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Button
            sx={buttonStyle}
            variant="contained"
            color="success"
            onClick={() => {
              handleOnClick();
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleOnClick()}
          >
            Leave
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};
