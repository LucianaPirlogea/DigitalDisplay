import { FC } from 'react';

import { LayoutTable } from './LayoutTable';
import './layoutGenerator.css';
import { RowSizeInputs } from './RowSizeInputs';
import { ColumnSizeInputs } from './ColumnSizeInputs';
import { TableControlPanel } from './TableControlPanel';
import { usePanelLayoutContext } from '../Contexts/PanelLayoutContext';

interface Props {
  loaded?: boolean;
}
export const LayoutGenerator: FC<Props> = ({ loaded }) => {
  const { rowsTemplate } = usePanelLayoutContext();

  const createRowsTemplateString = (): string => {
    let rowsTemplateString = '';
    rowsTemplate.forEach((row: string) => {
      rowsTemplateString += `${row}fr `;
    });
    return rowsTemplateString;
  };
  const createColumnsTemplateString = (): string => {
    let columnsTemplateString = '';
    rowsTemplate.forEach((column: string) => {
      columnsTemplateString += `${column}fr `;
    });
    return columnsTemplateString;
  };

  const tableContainerStyle = {
    gridTemplateColumns:
      createColumnsTemplateString() /*  `${DEFAULT_COLUMN_SIZE}fr `.repeat(noCols), */,
    gridTemplateRows:
      createRowsTemplateString() /* `${DEFAULT_ROW_SIZE}fr `.repeat(noRows), */,
  };

  if (loaded === false) {
    return <>Loading</>;
  }

  return (
    <>
      <div className="gridLayoutWrapper">
        <div style={{ display: 'inline-block' }}>
          <ColumnSizeInputs />
          <div className="tableContainerWrapper">
            <RowSizeInputs />

            <div
              id="tableContainer"
              className="tableContainer"
              style={tableContainerStyle}
            >
              <LayoutTable />
            </div>
          </div>
        </div>
        <TableControlPanel />
      </div>
    </>
  );
};
