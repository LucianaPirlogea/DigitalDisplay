import {
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  styled,
  TextField,
} from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageInfo, ImageSelector } from '..';
import { Advertisement } from '../../../models/advertisement';
import { addAdvertisement } from '../../../services';
import { uploadFile } from '../../../api/UploadFile';
import {
  DEFAULT_CONTENT_FILE_NAME,
  DEFAULT_CONTENT_SIZE,
  DEFAULT_HORIZONTAL_ALIGNMENT,
  DEFAULT_IMAGE_FIT,
  DEFAULT_SCROLLING_TEXT,
  DEFAULT_TEXT_COLOR,
  DEFAULT_TEXT_FONT_FAMILY,
  DEFAULT_TEXT_FONT_SIZE,
  DEFAULT_TEXT_PADDING,
  DEFAULT_VERTICAL_ALIGNMENT,
  MEDIA_API_PATH,
} from '../../../services/variables';
import {
  HORIZONTAL_ALIGNMENT,
  SCROLLING_TEXT,
  VERTICAL_ALIGNMENT,
} from '../../../utils';
import { FONT_MAP } from '../../../utils/fontFamilies';
import { PaddingInput } from '../PaddingInput';
import { SelectInput } from '../SelectInput';

interface Props {
  advertisementName: string;
  advertisementType: number;
  advertisementCategory: number;
  withImage: boolean;
}

export const TextAdvertisement: FC<Props> = ({
  advertisementName,
  advertisementType,
  advertisementCategory,
  withImage,
}) => {
  const [textFontSize, setTextFontSize] = useState<number>(
    DEFAULT_TEXT_FONT_SIZE
  );
  const [textColor, setTextColor] = useState<string>(DEFAULT_TEXT_COLOR);
  const [textFontFamily, setTextFontFamily] = useState<string>(
    DEFAULT_TEXT_FONT_FAMILY
  );
  const [paddingText, setPaddingText] = useState(DEFAULT_TEXT_PADDING);
  const [verticalAlignment, setVerticalAlignment] = useState<number>(
    DEFAULT_VERTICAL_ALIGNMENT
  );
  const [horizontalAlignment, setHorizontalAlignment] = useState<number>(
    DEFAULT_HORIZONTAL_ALIGNMENT
  );
  const [scrollingText, setScrollingText] = useState<number>(
    DEFAULT_SCROLLING_TEXT
  );
  const [textInput, setTextInput] = useState<string>('');
  const [contentFile, setContentFile] = useState<File>();
  const [contentSize, setContentSize] = useState<number>(DEFAULT_CONTENT_SIZE);
  const [contentFileName, setContentFileName] = useState<string>(
    DEFAULT_CONTENT_FILE_NAME
  );
  const [imageFit, setImageFit] = useState<boolean>(DEFAULT_IMAGE_FIT);

  const textFieldOptions = {
    textarea: {
      fontSize: textFontSize.toString() + 'px',
      color: textColor,
      fontFamily: textFontFamily,
      paddingTop: paddingText.paddingTop + 'px',
      paddingRight: paddingText.paddingRight + 'px',
      paddingBottom: paddingText.paddingBottom + 'px',
      paddingLeft: paddingText.paddingLeft + 'px',
      backgroundClip: 'content-box, padding-box',
      backgroundImage:
        'linear-gradient(to bottom, white 0%, white 100%), linear-gradient(to bottom, rgba(208, 206, 7, 0.4) 0%, rgba(208, 206, 7, 0.4) 100%)',
    },
    '& .MuiOutlinedInput-root': { padding: '1px', borderRadius: '0' },
    marginTop: '10px',
  };

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/AdvertisementList`;
    navigate(path);
  };

  const inputTextMinRows = 4;
  const inputTextMaxRows = 5;

  const CustomDivider = styled(Divider)({
    marginTop: '10px',
    marginBottom: '10px',
  });

  const customContainer = {
    backgroundColor: 'white',
    color: 'black',
    padding: '30px',
    marginBottom: '10px',
  };

  const gridStyle = {
    marginTop: '1px',
  };
  const lastGridStyle = {
    marginTop: '15px',
  };

  const gridMarginStyle = {
    marginTop: '5px',
  };

  const gridSpace = 4;
  const gridPaddingInputSpace = 2;
  const gridTextInputSpace = 8;
  const gridElementSpace = 2;

  const handleInputChange = (
    i: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTextInput(i.target.value);
  };

  const handlePaddingChange = (
    p: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let paddingId = p.target.id;
    let updatedPadding = {};

    updatedPadding = { [paddingId]: p.target.value };
    setPaddingText((paddingText) => ({
      ...paddingText,
      ...updatedPadding,
    }));
  };

  const convertPadding = (paddingText: any) => {
    return Object.values(paddingText).toString().replaceAll(',', ' ');
  };

  const convertColor = (textColor: string) => {
    //selectedColor = '0x' + selectedColor; //DO NOT REMOVE
    return textColor?.substring(1).toUpperCase();
  };

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      setContentFile(event.target.files[0]);
      setContentFileName(event.target.files[0].name);
      setContentSize(event.target.files[0].size);
    }
  };

  const handleImageFitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageFit(event.target.checked);
  };

  const imageSelect = () => {
    if (withImage) {
      return (
        <Container maxWidth="md" sx={customContainer} component={Paper}>
          <ImageSelector inputHandler={handleImageInput} />
        </Container>
      );
    }
  };

  const showImageInfo = () => {
    if (contentFileName != null && contentSize != null && imageFit != null) {
      if (contentFileName.length) {
        return (
          <Container maxWidth="md" sx={customContainer} component={Paper}>
            <ImageInfo
              contentFileName={contentFileName}
              contentSize={contentSize}
              imageFit={imageFit}
              handleImageFitFunction={handleImageFitChange}
            />
          </Container>
        );
      }
    }
  };

  const saveAdvertisement = async (): Promise<void> => {
    const selectedFont = FONT_MAP.get(textFontFamily);
    const dataToSend: Advertisement = {
      name: advertisementName,
      advertisementTypeId: advertisementType,
      text: textInput,
      textFontFamily: selectedFont,
      textFontSize: textFontSize,
      textFontColor: convertColor(textColor),
      textVerticalAlignment: verticalAlignment,
      textHorizontalAlignment: horizontalAlignment,
      textScrolling: scrollingText,
      textPadding: convertPadding(paddingText),
      categoryId: advertisementCategory,
      createdDate: new Date(),
    };
    if (withImage) {
      const data: any = new FormData();
      data.append('file', contentFile);
      const fileGuid = await uploadFile(MEDIA_API_PATH, data);

      dataToSend.graphicalContentFilename = fileGuid;
      dataToSend.imageFit = Number(imageFit);
    }

    await addAdvertisement(dataToSend).then(() => {
      routeChange();
    });
  };
  const fontFamilyDropdown = () => {
    const fontMap: JSX.Element[] = [];
    FONT_MAP.forEach((value: string, key: string) => {
      fontMap.push(
        <MenuItem value={key} key={value}>
          {value + ' (' + key + ')'}
        </MenuItem>
      );
    });
    return fontMap;
  };

  return (
    <>
      {imageSelect()}
      {showImageInfo()}
      <Container maxWidth="md" sx={customContainer} component={Paper}>
        <Grid container spacing={gridElementSpace}>
          <Grid item xs={gridSpace}>
            <TextField
              fullWidth
              id="outlined-number"
              label="Font Size"
              type="number"
              onChange={(event) => {
                setTextFontSize(Number(event.target.value));
              }}
              value={textFontSize}
            />
          </Grid>
          <Grid item xs={gridSpace}>
            <FormControl fullWidth>
              <TextField
                variant="standard"
                type="color"
                value={textColor}
                id="textColor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      Text color:
                    </InputAdornment>
                  ),
                }}
                required
                onChange={(event) => setTextColor(event.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={gridSpace}>
            <FormControl fullWidth>
              <InputLabel id="fontFamily">Font Family</InputLabel>
              <Select
                labelId="fontFamily"
                id="fontF"
                value={textFontFamily}
                label="Text Color"
                onChange={(event) => {
                  setTextFontFamily(event.target.value);
                }}
              >
                {fontFamilyDropdown()}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={gridElementSpace} sx={gridStyle}>
          <Grid item xs={gridSpace}>
            <FormControl fullWidth>
              <InputLabel id="verticalAlignment">
                Vertical Allignment
              </InputLabel>
              <SelectInput
                labelId={'verticalAlignment'}
                value={verticalAlignment}
                label={'Vertical Alignment'}
                setFunction={setVerticalAlignment}
                mapOptions={VERTICAL_ALIGNMENT}
              />
            </FormControl>
          </Grid>
          <Grid item xs={gridSpace}>
            <FormControl fullWidth>
              <InputLabel>Horizontal Allignment</InputLabel>
              <SelectInput
                labelId={'horziontalAlignment'}
                value={horizontalAlignment}
                label={'Horizontal Alignment'}
                setFunction={setHorizontalAlignment}
                mapOptions={HORIZONTAL_ALIGNMENT}
              />
            </FormControl>
          </Grid>
          <Grid item xs={gridSpace}>
            <FormControl fullWidth>
              <InputLabel>Scrolling Text</InputLabel>
              <SelectInput
                labelId={'scrollingText'}
                value={scrollingText}
                label={'Scrolling Text'}
                setFunction={setScrollingText}
                mapOptions={SCROLLING_TEXT}
              />
            </FormControl>
          </Grid>
        </Grid>

        <CustomDivider />
        <Grid
          container
          spacing={gridElementSpace}
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          <Grid item>
            <PaddingInput
              id="paddingTop"
              label="Padding Top"
              value={paddingText.paddingTop}
              handlePadding={handlePaddingChange}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={gridElementSpace}
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          <Grid item xs={gridPaddingInputSpace}>
            <PaddingInput
              id="paddingLeft"
              label="Padding Left"
              value={paddingText.paddingLeft}
              handlePadding={handlePaddingChange}
            />
          </Grid>
          <Grid item xs={gridTextInputSpace}>
            <TextField
              fullWidth
              multiline={true}
              minRows={inputTextMinRows}
              maxRows={inputTextMaxRows}
              onChange={(event) => {
                handleInputChange(event);
              }}
              sx={textFieldOptions}
            ></TextField>
          </Grid>
          <Grid item xs={gridPaddingInputSpace}>
            <PaddingInput
              id="paddingRight"
              label="Padding Right"
              value={paddingText.paddingRight}
              handlePadding={handlePaddingChange}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={gridElementSpace}
          alignItems="center"
          justifyContent="center"
          direction="row"
          sx={gridMarginStyle}
        >
          <Grid item>
            <PaddingInput
              id="paddingBottom"
              label="Padding Bottom"
              value={paddingText.paddingBottom}
              handlePadding={handlePaddingChange}
            />
          </Grid>
        </Grid>
        <CustomDivider />
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
    </>
  );
};
