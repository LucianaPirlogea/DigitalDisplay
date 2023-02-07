import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import {
  ImageAdvertisement,
  UnkownAdvertisement as UnknownAdvertisement,
} from '.';
import { AdvertisementType } from '../../models/advertisementType';
import { Category } from '../../models/category';
import { getAdvertisementsType } from '../../services';
import { getCategories } from '../../services';
import {
  ADVERTISEMENT_TYPE,
  CATEGORY_OTHER,
  DEFAULT_ADVERTISEMENT_TYPE,
} from '../../services/variables';
import { TextAdvertisement } from '.';
import { VideoAdvertisement } from '.';
import { WeatherAdvertisement } from '.';
import { BirthdayAdvertisement } from '.';
import { useParams } from 'react-router';
import { getSpecificAdvertisement } from '../../services/advertisements';
import { Advertisement } from '../../models/advertisement';
import { EditTextAdvertisement } from './AdvertisementType/EditTextAdvertisement';

interface Props {
  editMode: boolean;
}

export const AdvertisementCreate: FC<Props> = ({ editMode }) => {
  const [adTypes, setAdTypes] = useState<AdvertisementType[]>([]);
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<number>(DEFAULT_ADVERTISEMENT_TYPE);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [isEditMode] = useState<boolean>(editMode);
  const [advertisementObj, setAdvertisementObj] = useState<Advertisement>();

  const { advertisementId } = useParams();

  const getSpecificAd = useCallback(async () => {
    if (isEditMode) {
      const res = await getSpecificAdvertisement(Number(advertisementId));
      if (res) {
        setAdvertisementObj(res);
        setName(res.name);
        setSelectedCategory(res.categoryId);
        setType(res.advertisementTypeId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAdTypes = useCallback(async () => {
    const res = await getAdvertisementsType();
    if (res) {
      setAdTypes(res);
    }
    return res;
  }, []);

  const getAllCategories = useCallback(async () => {
    const res = await getCategories();
    if (res) {
      setCategories(res);
    }
    return res;
  }, []);

  const renderSwitch = (param: number) => {
    const switchInput = param;
    switch (switchInput) {
      case ADVERTISEMENT_TYPE.TEXT:
        if (isEditMode && advertisementObj != null) {
          return (
            <EditTextAdvertisement
              advertisementName={name}
              advertisementType={type}
              advertisementCategory={selectedCategory}
              withImage={false}
              advertisementObj={advertisementObj}
            />
          );
        } else
          return (
            <TextAdvertisement
              advertisementName={name}
              advertisementType={type}
              advertisementCategory={selectedCategory}
              withImage={false}
            />
          );
      case ADVERTISEMENT_TYPE.IMAGE:
        return (
          <ImageAdvertisement
            advertisementName={name}
            advertisementType={type}
            advertisementCategory={selectedCategory}
          />
        );
      case ADVERTISEMENT_TYPE.IMAGETEXT:
        if (isEditMode && advertisementObj != null) {
          return (
            <EditTextAdvertisement
              advertisementName={name}
              advertisementType={type}
              advertisementCategory={selectedCategory}
              withImage={true}
              advertisementObj={advertisementObj}
            />
          );
        } else
          return (
            <TextAdvertisement
              advertisementName={name}
              advertisementType={type}
              advertisementCategory={selectedCategory}
              withImage={true}
            />
          );

      case ADVERTISEMENT_TYPE.VIDEO:
        return (
          <VideoAdvertisement
            advertisementName={name}
            advertisementType={type}
            advertisementCategory={selectedCategory}
          />
        );
      case ADVERTISEMENT_TYPE.BIRTHDAY:
        return (
          <BirthdayAdvertisement
            advertisementName={name}
            advertisementType={type}
            advertisementCategory={selectedCategory}
          />
        );
      case ADVERTISEMENT_TYPE.WEATHER:
        return (
          <WeatherAdvertisement
            advertisementName={name}
            advertisementType={type}
            advertisementCategory={selectedCategory}
          />
        );
      default:
        return <UnknownAdvertisement />;
    }
  };

  const formStyle = {
    height: '100',
    margin: '30px auto',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '0',
  };

  const styleText = {
    justifyContent: 'center',
  };

  const styleDropdown = {
    marginTop: '0',
    minWidth: 120,
  };

  const styleGrid = {
    paddingTop: '10px !important',
  };

  const gridSpacing = 12;

  useEffect(() => {
    getAdTypes();
    getAllCategories();
    getSpecificAd();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const typeSelect = (typeEdit: number) => {
    const specificType = adTypes.find((t) => t.id === typeEdit)!;
    if (editMode) {
      return (
        <Select
          labelId="typesDropdown"
          id="selectStandard"
          value={type}
          inputProps={{ readOnly: true }}
          label="Type"
        >
          <MenuItem key={specificType?.id} value={specificType?.id}>
            {specificType?.name}
          </MenuItem>
        </Select>
      );
    } else {
      return (
        <Select
          labelId="typesDropdown"
          id="selectStandard"
          value={type}
          onChange={(event) => {
            setType(Number(event.target.value));
          }}
          label="Type"
        >
          {adTypes.map((adType) => (
            <MenuItem key={adType.id} value={adType.id}>
              {adType.name}
            </MenuItem>
          ))}
        </Select>
      );
    }
  };
  const categorySelect = () => {
    const otherCategory = categories.find(
      (category) => category.id === CATEGORY_OTHER
    )!;
    if (
      type === ADVERTISEMENT_TYPE.WEATHER ||
      type === ADVERTISEMENT_TYPE.BIRTHDAY
    ) {
      return (
        <Select
          labelId="categoriesDropdown"
          id="selectCategory"
          value={CATEGORY_OTHER}
          label="Category"
          inputProps={{ readOnly: true }}
        >
          <MenuItem key={otherCategory.id} value={otherCategory.id}>
            {otherCategory.name}
          </MenuItem>
        </Select>
      );
    } else {
      return (
        <Select
          labelId="categoriesDropdown"
          id="selectCategory"
          value={selectedCategory}
          onChange={(event) => {
            setSelectedCategory(Number(event.target.value));
          }}
          label="Category"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      );
    }
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        component={Paper}
        sx={formStyle}
        maxWidth={'md'}
      >
        <Grid item xs={gridSpacing} sx={styleText}>
          <Typography align="center" variant="h5">
            Create a new Advertisement
          </Typography>
        </Grid>

        <Grid item xs={gridSpacing}>
          <TextField
            fullWidth
            id="advertisementName"
            variant="standard"
            value={name}
            placeholder="Name"
            onChange={(e) => {
              if (e.target.value === ' ') {
                setName('');
              }
              setName(e.target.value);
            }}
            error={name.length === 0}
            helperText={name.length === 0 ? 'Empty field!' : ' '}
          />
        </Grid>

        <Grid item xs={6} sx={styleGrid}>
          <FormControl fullWidth={true} variant="standard" sx={styleDropdown}>
            <InputLabel id="typesDropdown">Type</InputLabel>
            {typeSelect(type)}
          </FormControl>
        </Grid>
        <Grid item xs={6} sx={styleGrid}>
          <FormControl fullWidth={true} variant="standard" sx={styleDropdown}>
            <InputLabel id="categoriesDropdown">Category</InputLabel>
            {categorySelect()}
          </FormControl>
        </Grid>
      </Grid>

      {renderSwitch(type)}
    </>
  );
};
