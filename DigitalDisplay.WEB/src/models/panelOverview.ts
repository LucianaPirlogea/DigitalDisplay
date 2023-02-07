export interface PanelInfo {
  id: number;
  panelLayoutId: number;
  panelLayoutName: string;
  name: string;
  backgroundColor: string;
  backgroundImageContent: string;
  backgroundImageFilename: string;
  zoneCount: number;
  devices: PanelInfoDevice[];
}

export interface PanelInfoDevice {
  id: number;
  deviceId: number;
  name: string;
  location: string;
  startDateTime: Date;
}

export interface EditPanelInfo {
  id: number;
  name: string;
}
