import { createContext, useContext } from 'react';
import { Item } from '../../models/gridLayout';

export interface IPanelLayoutContext {
  name: string;
  setName(name: string): void;
  description: string;
  setDescription(description: string): void;
  noRows: number;
  setNoRows(noRows: number): void;
  noCols: number;
  setNoCols(noCols: number): void;
  items: Item[];
  setItems(items: Item[]): void;
  rowGap: number;
  setRowGap(rowGap: number): void;
  columnGap: number;
  setColumnGap(columnGap: number): void;
  rowsTemplate: Array<string>;
  setRowsTemplate(rowsTemplate: Array<string>): void;
  columnsTemplate: Array<string>;
  setColumnsTemplate(columnsTemplate: Array<string>): void;
}

export const PanelLayoutContext = createContext<
  IPanelLayoutContext | undefined
>(undefined);

export const usePanelLayoutContext = (): IPanelLayoutContext => {
  const contextValue = useContext(PanelLayoutContext);

  if (!contextValue) {
    throw new Error(
      'No Context value found for `LayoutGeneratorContext`. Did you forget to wrap your application in the `LayoutGeneratorContextProvider`?'
    );
  }

  return contextValue;
};
