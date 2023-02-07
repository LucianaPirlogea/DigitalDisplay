import { Button, Container, styled } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageInfo, ImageSelector } from '..';
import { Advertisement } from '../../../models/advertisement';
import { uploadFile } from '../../../api/UploadFile';
import {
  DEFAULT_CONTENT_FILE_NAME,
  DEFAULT_CONTENT_SIZE,
  DEFAULT_IMAGE_FIT,
  MEDIA_API_PATH,
} from '../../../services/variables';
import { addAdvertisement } from '../../../services';

interface Props {
  advertisementName: string;
  advertisementType: number;
  advertisementCategory: number;
}

export const ImageAdvertisement: FC<Props> = ({
  advertisementName,
  advertisementType,
  advertisementCategory,
}) => {
  const [contentFile, setContentFile] = useState<File>();
  const [contentSize, setContentSize] = useState<number>(DEFAULT_CONTENT_SIZE);
  const [contentFileName, setContentFileName] = useState<string>(
    DEFAULT_CONTENT_FILE_NAME
  );
  const [imageFit, setImageFit] = useState<boolean>(DEFAULT_IMAGE_FIT);

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/AdvertisementList`;
    navigate(path);
  };

  const CustomContainer = styled(Container)({
    backgroundColor: 'white',
    color: 'black',
    padding: '30px',
    textAlign: 'center',
    boxShadow:
      'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
  });

  const saveAdvertisement = async (): Promise<void> => {
    const data: any = new FormData();
    data.append('file', contentFile);
    const fileGuid = await uploadFile(MEDIA_API_PATH, data);

    const dataToSend: Advertisement = {
      name: advertisementName,
      advertisementTypeId: advertisementType,
      categoryId: advertisementCategory,
      graphicalContentFilename: fileGuid,
      imageFit: Number(imageFit),
      createdDate: new Date(),
    };
    await addAdvertisement(dataToSend).then(() => {
      routeChange();
    });
  };

  const handleImageFitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageFit(event.target.checked);
  };

  const handleImageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      setContentFile(event.target.files[0]);
      setContentFileName(event.target.files[0].name);
      setContentSize(event.target.files[0].size);
    }
  };

  const displayInfo = (contentFileName: string) => {
    if (contentFileName.length) {
      return (
        <div>
          <ImageInfo
            contentFileName={contentFileName}
            contentSize={contentSize}
            imageFit={imageFit}
            handleImageFitFunction={handleImageFitChange}
          />
          <Button
            variant="contained"
            onClick={() => {
              saveAdvertisement();
            }}
          >
            Add Advertisement
          </Button>
        </div>
      );
    }
  };
  return (
    <CustomContainer maxWidth="md">
      <ImageSelector inputHandler={handleImageInput} />
      {displayInfo(contentFileName)}
    </CustomContainer>
  );
};
