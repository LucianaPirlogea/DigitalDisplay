import {
  Button,
  Container,
  Divider,
  FormGroup,
  LinearProgress,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadChunk, uploadComplete } from '../../../api/UploadFile';
import { v4 as uuidv4 } from 'uuid';
import { formatBytes } from '../../../utils/bytesConvert';
import { getExtension } from '../../../utils/getExtension';
import { addAdvertisement } from '../../../services';
import { Advertisement } from '../../../models/advertisement';
import {
  CHUNK_SIZE,
  DEFAULT_BEGIN_CHUNK,
  DEFAULT_CHUNK_COUNT,
  DEFAULT_CONTENT_FILE_NAME,
  DEFAULT_CONTENT_SIZE,
  DEFAULT_COUNTER,
  DEFAULT_GUID_NAME,
  DEFAULT_PROGRESS,
  ONE_MB,
} from '../../../services/variables';

interface Props {
  advertisementName: string;
  advertisementType: number;
  advertisementCategory: number;
}

export const VideoAdvertisement: FC<Props> = ({
  advertisementName,
  advertisementType,
  advertisementCategory,
}) => {
  const chunkSize = ONE_MB * CHUNK_SIZE;
  const [contentFile, setContentFile] = useState<File>();
  const [contentFileName, setContentFileName] = useState<string>(
    DEFAULT_CONTENT_FILE_NAME
  );
  const [contentSize, setContentSize] = useState<number>(DEFAULT_CONTENT_SIZE);
  const [counter, setCounter] = useState<number>(DEFAULT_COUNTER);
  const [chunkCount, setChunckCount] = useState<number>(DEFAULT_CHUNK_COUNT);
  const [guidName, setGuidName] = useState<string>(DEFAULT_GUID_NAME);
  const [beginChunk, setBeginChunk] = useState<number>(DEFAULT_BEGIN_CHUNK);
  const [endChunk, setEndChunk] = useState<number>(chunkSize);
  const [progress, setProgress] = useState<number>(DEFAULT_PROGRESS);

  useEffect(() => {
    if (contentSize > 0) {
      fileUpload();
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);
  const containerStyle = {
    backgroundColor: 'white',
    color: 'black',
    padding: '30px',
    boxShadow:
      'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
    textAlign: 'center',
  };

  const dividerStyle = {
    marginBottom: '10px',
    marginTop: '10px',
  };

  const progressStyle = {
    marginTop: '10px',
    height: 10,
    borderRadius: 5,
  };

  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/AdvertisementList`;
    navigate(path);
  };

  const fileGuid = () => {
    const fileId = uuidv4() + '.' + getExtension(contentFileName);
    setGuidName(fileId);
  };

  const calculateTotalChunks = () => {
    const totalChunks =
      contentSize % chunkSize === 0
        ? contentSize / chunkSize
        : Math.floor(contentSize / chunkSize) + 1;

    if (contentSize < chunkSize) {
      setChunckCount(totalChunks);
      setEndChunk(contentSize);
    } else {
      setChunckCount(totalChunks);
    }
    fileGuid();
  };

  const fileUpload = () => {
    if (counter <= chunkCount) {
      setCounter(counter + 1);
      if (contentFile != null) {
        let chunk = contentFile.slice(beginChunk, endChunk);
        uploadChunkAsync(chunk);
      }
    }
  };

  const uploadChunkAsync = async (chunk: Blob) => {
    try {
      const response = await uploadChunk(chunk, counter, guidName);
      if (response.isSuccess) {
        setBeginChunk(endChunk);
        setEndChunk(endChunk + chunkSize);
        if (counter === chunkCount) {
          await uploadCompleteAsync();
        } else {
          let percentage = (counter / chunkCount) * 100;
          setProgress(percentage);
        }
      } else {
        //TO DO: error handling
      }
    } catch (error) {
      //TO DO: error handling
    }
  };

  const handleVideoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      setContentFile(event.target.files[0]);
      setContentFileName(event.target.files[0].name);
      setContentSize(event.target.files[0].size);
    }
  };

  const handleVideo = () => {
    resetChunkProperties();
    calculateTotalChunks();
    fileUpload();
    setProgress(1);
  };

  const uploadCompleteAsync = async () => {
    let formData = new FormData();
    formData.append('fileName', guidName);

    const response = await uploadComplete(formData, guidName);
    if (response?.isSuccess) {
      setProgress(100);
      saveAdvertisement();
    }
  };
  const saveAdvertisement = async (): Promise<void> => {
    const dataToSend: Advertisement = {
      name: advertisementName,
      advertisementTypeId: advertisementType,
      categoryId: advertisementCategory,
      graphicalContentFilename: guidName,
      createdDate: new Date(),
    };
    await addAdvertisement(dataToSend).then(() => {
      routeChange();
    });
  };
  const resetChunkProperties = () => {
    setProgress(DEFAULT_PROGRESS);
    setCounter(DEFAULT_COUNTER);
    setBeginChunk(DEFAULT_BEGIN_CHUNK);
    setEndChunk(chunkSize);
  };
  const displayText = (contentFileName: string) => {
    if (contentFileName.length) {
      return (
        <div>
          <Divider sx={dividerStyle} />
          <Typography variant="h6">Filename: {contentFileName} </Typography>
          <Typography variant="h6">Size: {formatBytes(contentSize)}</Typography>

          <Divider sx={dividerStyle} />
          <Button
            variant="contained"
            onClick={() => {
              handleVideo();
            }}
          >
            Add Advertisement
          </Button>
          <LinearProgress
            sx={progressStyle}
            variant="determinate"
            value={progress}
          />
        </div>
      );
    }
  };

  return (
    <Container maxWidth="md" sx={containerStyle}>
      <FormGroup>
        <Button variant="contained" component="label" color="success">
          <input
            type="file"
            id="videoFileContent"
            hidden
            accept="video/mp4, video/*"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleVideoInput(event);
            }}
          />
          Upload Video
        </Button>
      </FormGroup>
      {displayText(contentFileName)}
    </Container>
  );
};
