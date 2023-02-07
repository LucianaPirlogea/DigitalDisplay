import { Typography } from '@mui/material';
import { FC, useContext, useState } from 'react';
import { PanelLayoutData } from '../../models/panelLayout';
import { PanelContext } from '../Contexts/PanelContext';
import { PanelZoneModal } from './PanelZoneModal';

export const ZonesOverview: FC<{
  layout: PanelLayoutData;
}> = ({ layout }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [activeZone, setActiveZone] = useState<number>(0);
  const { isZoneSet } = useContext(PanelContext);

  const addFraction = (style: string): string => {
    const elements = style.split(' ');
    for (let i = 0; i < elements.length; i++) {
      elements[i] += 'fr';
    }
    const newStyle = elements.join(' ');
    return newStyle;
  };

  const handleZoneClick = (zoneNumber: number) => {
    setOpenModal(true);
    setActiveZone(zoneNumber);
  };

  const overviewStyle = {
    height: '300px',
    display: 'grid',
    gridTemplateColumns: addFraction(layout.columns),
    gridTemplateRows: addFraction(layout.rows),
    columnGap: layout.columnGap + 'px',
    rowGap: layout.rowGap + 'px',
  };

  const cellStyle = {
    border: '1px solid #cccccc',
    backgroundColor: 'gray',
    opacity: 0.3,
  };

  const zoneStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto',
  };

  const notSetZone = {
    border: '1px solid #fbfa89',
    backgroundColor: '#fdfcba',
  };

  const setZone = {
    border: '1px solid #ccac0b',
    backgroundColor: '#d0ce07',
  };

  const cells = [];
  const noRows = layout.rows.split(' ').length;
  const noCols = layout.columns.split(' ').length;
  let zoneNumber = 0;
  for (let i = 1; i <= noRows; i++) {
    for (let j = 1; j <= noCols; j++) {
      let element;
      const inZone = layout.panelLayoutZones.find(
        (el) => el.rowStart === i && el.columnStart === j
      );
      const withinZone = layout.panelLayoutZones.find(
        (el) =>
          el.rowStart <= i &&
          el.columnStart <= j &&
          el.rowStart + el.rowSpan - 1 >= i &&
          el.columnStart + el.columnSpan - 1 >= j
      );
      if (inZone) {
        zoneNumber++;
        let zonePosition = {
          gridRowStart: inZone.rowStart,
          gridColumnStart: inZone.columnStart,
          gridRowEnd: 'span ' + inZone.rowSpan,
          gridColumnEnd: 'span ' + inZone.columnSpan,
        };
        let styleColor = isZoneSet(zoneNumber) ? setZone : notSetZone;
        let style = {
          ...zonePosition,
          ...zoneStyle,
          ...styleColor,
        };
        element = (
          <div
            key={i * noCols + j}
            style={style}
            id={zoneNumber.toString()}
            onClick={(e) => handleZoneClick(Number(e.currentTarget.id))}
          >
            <Typography variant="h5" fontWeight={600}>
              #{zoneNumber}
            </Typography>
          </div>
        );
      } else if (withinZone) {
        continue;
      } else {
        element = <div key={i * noCols + j} style={cellStyle}></div>;
      }
      cells.push(element);
    }
  }
  return (
    <div style={overviewStyle}>
      {cells}
      <PanelZoneModal
        show={openModal}
        closeModal={setOpenModal}
        zoneNumber={activeZone}
      />
    </div>
  );
};
