import { FC, useCallback, useEffect, useState } from 'react';
import { PanelZone } from '../../models/panelZone';
import { PanelContext } from '../Contexts/PanelContext';
import { Advertisement } from '../../models/advertisement';
import { getAdvertisements } from '../../services';

export const PanelProvider: FC<{ children: any }> = ({ children }) => {
  const [zones, setZones] = useState<PanelZone[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);

  const getAllAdvertisements = useCallback(async () => {
    const res = await getAdvertisements();
    if (res) {
      setAds(res);
    }

    return res;
  }, []);

  useEffect(() => {
    getAllAdvertisements();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addZones = (count: number) => {
    const newZones = [];
    for (let i = 0; i < count; i++) {
      const newZone: PanelZone = {
        zoneNumber: -1,
        zoneType: -1,
        advertisementIds: [],
      };
      newZones.push(newZone);
    }
    setZones(newZones);
  };

  const updateZone = (
    zoneNumber: number,
    zoneType: number,
    adIds: number[]
  ) => {
    const newZone: PanelZone = {
      zoneNumber: zoneNumber,
      zoneType: zoneType,
      advertisementIds: adIds,
    };
    const zoneIndex = zoneNumber - 1;
    const newZones = zones.map((zone: PanelZone, index: number) =>
      index === zoneIndex ? newZone : zone
    );
    setZones(newZones);
  };

  const isZoneSet = (zoneNumber: number) => {
    const isSet = (zone: PanelZone) => zone.zoneNumber === zoneNumber;
    return zones.some(isSet);
  };

  return (
    <PanelContext.Provider
      value={{ zones, ads, addZones, updateZone, isZoneSet }}
    >
      {children}
    </PanelContext.Provider>
  );
};
