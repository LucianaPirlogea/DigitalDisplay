import { createContext } from 'react';
import { Advertisement } from '../../models/advertisement';
import { PanelZone } from '../../models/panelZone';

export type PanelContextType = {
  zones: PanelZone[];
  ads: Advertisement[];
  addZones: (count: number) => void;
  updateZone: (zoneNumber: number, zoneType: number, adIds: number[]) => void;
  isZoneSet: (zoneNumber: number) => boolean;
};

export const PanelContext = createContext<PanelContextType>(
  {} as PanelContextType
);
