import { TextField } from '@mui/material';
import { FC } from 'react';

interface Props {
  id: string;
  label: string;
  value: string;
  handlePadding: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const PaddingInput: FC<Props> = ({
  id,
  label,
  value,
  handlePadding,
}) => {
  const textFieldStyle = {
    width: '100px',
  };

  return (
    <TextField
      id={id}
      label={label}
      type="number"
      onChange={(event) => {
        handlePadding(event);
      }}
      value={value}
      sx={textFieldStyle}
    />
  );
};
