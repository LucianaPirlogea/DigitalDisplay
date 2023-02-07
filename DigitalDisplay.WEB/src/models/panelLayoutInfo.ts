import { Item } from './gridLayout';

export interface PanelLayoutInfo {
  name: string;
  description: string;
  rows: string;
  columns: string;
  rowGap: number;
  columnGap: number;
  panelLayoutZones: Item[];
}
