import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';
import { FC } from 'react';
import { usePanelLayoutContext } from '../Contexts/PanelLayoutContext';

export const ColumnSizeInputs: FC = () => {
  const { noCols, columnsTemplate, setColumnsTemplate } =
    usePanelLayoutContext();
  const updateColsSize = (index: number, value: number): void => {
    const tableContainerElement = document.getElementsByClassName(
      'tableContainer'
    )[0] as HTMLDivElement;

    let gridTemplateColumns =
      tableContainerElement.style.gridTemplateColumns.split(' ');
    gridTemplateColumns[index] = `${value}fr`;

    tableContainerElement.style.setProperty(
      'grid-template-columns',
      gridTemplateColumns.join(' ')
    );

    const columnsTemplateArr = columnsTemplate;
    columnsTemplateArr[index] = value.toString();

    setColumnsTemplate(columnsTemplateArr);
  };

  // size inputs for each column
  const columnSizeInputs = [];
  for (let i = 0; i < noCols; i++) {
    columnSizeInputs.push(
      <FormControl
        key={i}
        sx={{ m: 2 }}
        className="columnSizeInput"
        variant="outlined"
        size="small"
      >
        <OutlinedInput
          defaultValue={Number(columnsTemplate[i])}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value > 0) {
              updateColsSize(i, value);
            }
          }}
          endAdornment={<InputAdornment position="end">fr</InputAdornment>}
          aria-describedby="column size input"
        />
      </FormControl>
    );
  }

  return <div className="columnSizeInputsWrapper">{columnSizeInputs}</div>;
};
