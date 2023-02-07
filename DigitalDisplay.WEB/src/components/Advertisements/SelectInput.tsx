import { Select, MenuItem } from '@mui/material';
import { FC } from 'react';

interface Props {
  labelId: string;
  value: number;
  label: string;
  setFunction: any;
  mapOptions: any;
}

export const SelectInput: FC<Props> = ({
  labelId,
  value,
  label,
  setFunction,
  mapOptions,
}) => {
  return (
    <Select
      labelId="verticalAlignment"
      value={value}
      label="Vertical Alignment"
      onChange={(event) => {
        setFunction(Number(event.target.value));
      }}
    >
      {mapOptions.map((alignment: any) => (
        <MenuItem value={alignment.id} key={alignment.id}>
          {alignment.alignment}
        </MenuItem>
      ))}
    </Select>
  );
};
