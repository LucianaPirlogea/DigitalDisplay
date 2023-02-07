import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { FC } from 'react';
import { usePanelLayoutContext } from '../Contexts/PanelLayoutContext';

export const RowSizeInputs: FC = () => {
  const { noRows, setRowsTemplate, rowsTemplate } = usePanelLayoutContext();

  const updateRowsSize = (index: number, value: number): void => {
    const tableContainerElement = document.getElementsByClassName(
      'tableContainer'
    )[0] as HTMLDivElement;

    let gridTemplateRows =
      tableContainerElement.style.gridTemplateRows.split(' ');
    gridTemplateRows[index] = `${value}fr`;

    tableContainerElement.style.setProperty(
      'grid-template-rows',
      gridTemplateRows.join(' ')
    );

    const rowsTemplateArr = rowsTemplate;
    rowsTemplateArr[index] = value.toString();

    setRowsTemplate(rowsTemplateArr);
  };

  // size inputs for each row
  const rowSizeInputs = [];

  for (let i = 0; i < noRows; i++) {
    rowSizeInputs.push(
      <FormControl
        key={i}
        sx={{ m: 2 }}
        className="rowSizeInput"
        variant="outlined"
        size="small"
      >
        <OutlinedInput
          defaultValue={Number(rowsTemplate[i])}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value > 0) {
              updateRowsSize(i, value);
            }
          }}
          endAdornment={<InputAdornment position="end">fr</InputAdornment>}
          aria-describedby="row size input"
        />
      </FormControl>
    );
  }

  return <div className="rowSizeInputsWrapper">{rowSizeInputs}</div>;
};
