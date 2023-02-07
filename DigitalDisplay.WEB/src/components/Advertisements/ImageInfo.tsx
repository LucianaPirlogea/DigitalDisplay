import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { FC } from 'react';
import { formatBytes } from '../../utils/bytesConvert';

interface Props {
  contentFileName: string;
  contentSize: number;
  imageFit: boolean;
  handleImageFitFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageInfo: FC<Props> = ({
  contentFileName,
  contentSize,
  imageFit,
  handleImageFitFunction,
}) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant="h6" align="center">
        Filename: {contentFileName}{' '}
      </Typography>
      <Typography variant="h6" align="center">
        Size: {formatBytes(contentSize)}
      </Typography>
      <FormControlLabel
        label="Fit Image"
        control={
          <Checkbox checked={imageFit} onChange={handleImageFitFunction} />
        }
      />
    </Box>
  );
};
