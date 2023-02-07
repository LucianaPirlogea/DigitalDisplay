import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { CreatePanelInfo } from '../../models/createPanelInfo';
import { PanelLayoutData } from '../../models/panelLayout';
import { createPanel } from '../../services';
import { getPanelLayoutsData } from '../../services';
import { uploadFile } from '../../api/UploadFile';
import {
  DEFAULT_SELECTED_COLOR,
  MEDIA_API_PATH,
} from '../../services/variables';
import { PanelContext } from '../Contexts/PanelContext';
import { ZonesOverview } from './ZonesOverview';

export const NewPanel: FC = () => {
  const errorMessages = {
    empty: 'Empty field!',
    notSelected: 'No option has been selected!',
    zonesNotSet: 'The following zones were not set: ',
  };
  const [nameErrorText, setNameErrorText] = useState<string>('');
  const [layoutErrorText, setLayoutErrorText] = useState<string>('');
  const [zonesErrorText, setZonesErrorText] = useState<string>('');

  const [layouts, setLayouts] = useState<PanelLayoutData[]>([]);
  const [selectedLayout, setSelectedLayout] = useState<PanelLayoutData | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    DEFAULT_SELECTED_COLOR
  );
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const { zones, addZones } = useContext(PanelContext);
  const navigate = useNavigate();

  const getPanelLayoutsDatas = useCallback(async () => {
    const res = await getPanelLayoutsData();
    if (res) {
      setLayouts(res);
    }
    return res;
  }, []);

  useEffect(() => {
    getPanelLayoutsDatas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkErrors = () => {
    let flag = true;
    if (name.length === 0) {
      setNameErrorText(errorMessages.empty);
      flag = false;
    }
    if (selectedLayout === null) {
      setLayoutErrorText(errorMessages.notSelected);
      flag = false;
      return false;
    }
    let zonesMessage = errorMessages.zonesNotSet;
    zones.forEach((zone, index) => {
      if (zone.zoneType === -1) {
        zonesMessage += index + 1 + ' ';
        flag = false;
      }
    });
    if (flag === false) {
      setZonesErrorText(zonesMessage);
    }
    return flag;
  };
  const isErrored = (errorMessage: string) => {
    return errorMessage !== '';
  };

  const savePanelInfo = async () => {
    let filename = null;
    if (image.length !== 0) {
      const data = new FormData();
      data.append('file', image);
      filename = await uploadFile(MEDIA_API_PATH, data);
    }

    const panel: CreatePanelInfo = {
      panelLayoutId: selectedLayout!.id,
      name: name,
      backgroundColor: selectedColor.slice(1),
      backgroundImageFilename: filename,
      zones: zones,
    };

    await createPanel(panel);
    navigate('/Panel');
  };

  const formStyle = {
    width: '70%',
    margin: '10px auto',
    padding: '20px',
  };

  return (
    <Grid container spacing={2} component={Paper} sx={formStyle}>
      <Grid item xs={12}>
        <Typography variant="h5">Create a new Panel</Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <TextField
            variant="standard"
            id="panelName"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Panel name:</InputAdornment>
              ),
            }}
            required
            onChange={(e) => {
              const panelName = e.target.value.trim();
              setName(panelName);
            }}
            error={isErrored(nameErrorText)}
            helperText={isErrored(nameErrorText) ? nameErrorText : ''}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <TextField
            select
            variant="standard"
            value={selectedLayout ? selectedLayout.id : '0'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">Layout:</InputAdornment>
              ),
            }}
            error={isErrored(layoutErrorText)}
            helperText={isErrored(layoutErrorText) ? layoutErrorText : ''}
          >
            <MenuItem disabled value="0">
              Select layout
            </MenuItem>
            {layouts.map((layout) => (
              <MenuItem
                key={layout.id}
                value={layout.id}
                onClick={() => {
                  setSelectedLayout(layout);
                  addZones(layout.panelLayoutZones.length);
                }}
              >
                {layout.name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <TextField
            variant="standard"
            type="color"
            value={selectedColor}
            id="panelBackgroundColor"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  Background color:
                </InputAdornment>
              ),
            }}
            required
            onChange={(e) => setSelectedColor(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <TextField
            type="file"
            variant="standard"
            id="backgroundImageContent"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  Background image:
                </InputAdornment>
              ),
            }}
            onChange={(e: any) => {
              setImage(e.target.files[0]);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6">Zones</Typography>
        <Typography
          display={isErrored(zonesErrorText) ? 'inline' : 'none'}
          color="red"
        >
          {zonesErrorText}
        </Typography>
        {selectedLayout ? (
          <ZonesOverview layout={selectedLayout} />
        ) : (
          <i>No layout selected/No zones found</i>
        )}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="success"
          type="submit"
          onClick={() => {
            if (checkErrors()) {
              savePanelInfo();
            }
          }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};
