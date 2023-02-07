import { Button, TextField } from '@mui/material';
import { FC, useEffect } from 'react';
import {
  DEFAULT_COLUMN_SIZE,
  DEFAULT_ROW_SIZE,
} from '../../services/variables';
import { usePanelLayoutContext } from '../Contexts/PanelLayoutContext';

export const TableControlPanel: FC = () => {
  const {
    noRows,
    setNoRows,
    noCols,
    setNoCols,
    rowGap,
    setRowGap,
    columnGap,
    setColumnGap,
    setRowsTemplate,
    rowsTemplate,
    setColumnsTemplate,
    columnsTemplate,
  } = usePanelLayoutContext();

  const updateRowGap = (value: number): void => {
    const tableContainerElement = document.getElementsByClassName(
      'tableContainer'
    )[0] as HTMLDivElement;

    tableContainerElement.style.rowGap = `${value}px`;
  };
  const updateColumnGap = (value: number): void => {
    const tableContainerElement = document.getElementsByClassName(
      'tableContainer'
    )[0] as HTMLDivElement;

    tableContainerElement.style.columnGap = `${value}px`;
  };

  const updateRowsNumber = (rowsNumber: number): void => {
    setNoRows(rowsNumber);

    const tableContainerElement = document.getElementsByClassName(
      'tableContainer'
    )[0] as HTMLDivElement;

    let gridTemplateRows =
      tableContainerElement.style.gridTemplateRows.split(' ');

    let rowsTemplateArr = rowsTemplate;

    for (let i = gridTemplateRows.length; i < rowsNumber; i++) {
      gridTemplateRows.push('1fr');
      rowsTemplateArr.push(`${DEFAULT_ROW_SIZE}`);
    }
    for (let i = gridTemplateRows.length; i > rowsNumber; i--) {
      gridTemplateRows.pop();
      rowsTemplateArr.pop();
    }

    tableContainerElement.style.setProperty(
      'grid-template-rows',
      gridTemplateRows.join(' ')
    );

    setRowsTemplate(rowsTemplateArr);
  };

  const updateColsNumber = (colsNumber: number): void => {
    setNoCols(colsNumber);

    const tableContainerElement = document.getElementsByClassName(
      'tableContainer'
    )[0] as HTMLDivElement;

    let gridTemplateCols =
      tableContainerElement.style.gridTemplateColumns.split(' ');

    let columnsTemplateArr = columnsTemplate;

    for (let i = gridTemplateCols.length; i < colsNumber; i++) {
      gridTemplateCols.push('1fr');
      columnsTemplateArr.push(`${DEFAULT_COLUMN_SIZE}`);
    }
    for (let i = gridTemplateCols.length; i > colsNumber; i--) {
      gridTemplateCols.pop();
      columnsTemplateArr.pop();
    }

    tableContainerElement.style.setProperty(
      'grid-template-columns',
      gridTemplateCols.join(' ')
    );

    setColumnsTemplate(columnsTemplateArr);
  };

  const limitGap = (value: number): number => {
    if (value > 200) {
      value = 200;
    }
    if (value < 0) {
      value = 0;
    }
    return value;
  };

  useEffect(() => {
    updateRowGap(rowGap);
  }, [rowGap]);

  useEffect(() => {
    updateColumnGap(columnGap);
  }, [columnGap]);

  return (
    <div className="tableSizeWrapper">
      <Button
        sx={{ mb: 2 }}
        variant="contained"
        color="success"
        type="submit"
        onClick={() => window.location.reload()}
      >
        Reset
      </Button>

      <TextField
        sx={{ m: 2 }}
        label="Rows"
        type="number"
        value={noRows}
        onChange={(e) => {
          updateRowsNumber(Number(e.target.value));
        }}
        onKeyDown={(e) => e.preventDefault()}
        inputProps={{ min: 1, max: 10 }}
      />

      <TextField
        sx={{ m: 2 }}
        label="Cols"
        type="number"
        value={noCols}
        onChange={(e) => {
          updateColsNumber(Number(e.target.value));
        }}
        onKeyDown={(e) => e.preventDefault()}
        inputProps={{ min: 1, max: 10 }}
      />

      <TextField
        sx={{ m: 2 }}
        label="Row Gap"
        type="number"
        value={rowGap}
        onChange={(e) => {
          const value = limitGap(Number(e.target.value));
          setRowGap(value);
        }}
        inputProps={{ min: 0, max: 200 }}
        error={rowGap > 200}
        helperText={rowGap > 200 ? '< 200px' : ''}
      />

      <TextField
        sx={{ m: 2 }}
        label="Col Gap"
        type="number"
        value={columnGap}
        onChange={(e) => {
          const value = limitGap(Number(e.target.value));
          setColumnGap(value);
        }}
        inputProps={{ min: 0, max: 200 }}
        error={columnGap > 200}
        helperText={columnGap > 200 ? '< 200px' : ''}
      />
    </div>
  );
};
