import { FormGroup, Button } from '@mui/material';
import { FC } from 'react';

interface Props {
  inputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageSelector: FC<Props> = ({ inputHandler }) => {
  return (
    <FormGroup>
      <Button variant="contained" component="label" color="success">
        <input
          type="file"
          id="videoFileContent"
          hidden
          accept="image/*"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            inputHandler(event);
          }}
        />
        Upload Image
      </Button>
    </FormGroup>
  );
};
