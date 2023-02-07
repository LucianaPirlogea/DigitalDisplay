import { PanelLayoutZone } from './panelLayoutZone';

export interface PanelLayout {
  id: number;
  name: string;
  zonesNumber: number;
  panelsNumber: number;
}

export interface PanelLayoutData {
  id: number;
  name: string;
  rows: string;
  columns: string;
  rowGap: number;
  columnGap: number;
  panelLayoutZones: PanelLayoutZone[];
}
