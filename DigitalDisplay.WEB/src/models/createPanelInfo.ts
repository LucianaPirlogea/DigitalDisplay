import { PanelZone } from './panelZone';

export interface CreatePanelInfo {
  panelLayoutId: number;
  name: string;
  backgroundColor: string;
  backgroundImageFilename: string | null;
  zones: PanelZone[];
}
