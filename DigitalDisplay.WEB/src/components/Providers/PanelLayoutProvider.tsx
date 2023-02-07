import { FC, useState } from 'react';
import { Item } from '../../models/gridLayout';
import {
  DEFAULT_COLUMN_GAP,
  DEFAULT_COLUMN_NUMBER,
  DEFAULT_ROW_GAP,
  DEFAULT_ROW_NUMBER,
} from '../../services/variables';
import { PanelLayoutContext } from '../Contexts/PanelLayoutContext';

export const PanelLayoutProvider: FC<{ children: any }> = ({ children }) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [noRows, setNoRows] = useState(DEFAULT_ROW_NUMBER);
  const [noCols, setNoCols] = useState(DEFAULT_COLUMN_NUMBER);
  const [items, setItems] = useState<Item[]>([]);
  const [rowGap, setRowGap] = useState(DEFAULT_ROW_GAP);
  const [columnGap, setColumnGap] = useState(DEFAULT_COLUMN_GAP);
  const [rowsTemplate, setRowsTemplate] = useState(['1', '1', '1']);
  const [columnsTemplate, setColumnsTemplate] = useState(['1', '1', '1', '1']);

  return (
    <PanelLayoutContext.Provider
      value={{
        name,
        setName,
        description,
        setDescription,
        noRows,
        setNoRows,
        noCols,
        setNoCols,
        items,
        setItems,
        rowGap,
        setRowGap,
        columnGap,
        setColumnGap,
        rowsTemplate,
        setRowsTemplate,
        columnsTemplate,
        setColumnsTemplate,
      }}
    >
      {children}
    </PanelLayoutContext.Provider>
  );
};
