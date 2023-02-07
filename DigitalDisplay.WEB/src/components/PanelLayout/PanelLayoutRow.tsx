import { TableRow, TableCell } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PanelLayout } from '../../models/panelLayout';
import { ActionsMenu } from '../ActionsMenu';
import '../Advertisements/AdsTable.css';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal';

const PanelLayoutRow: FC<{
  layouts: PanelLayout[];
  onDelete: Function;
  onDuplicate: Function;
}> = ({ layouts, onDelete, onDuplicate }) => {
  const [showModal, setShowModal] = useState(false);
  const [valueId, setValueId] = useState<number>(-1);
  const navigate = useNavigate();

  const getUpdatePanelLayoutRoute = (
    id: number,
    query: { zones: number; panels: number }
  ) => {
    return `/UpdatePanelLayout/${id}?panels=${query.panels}&zones=${query.zones}`;
  };

  return (
    <>
      {layouts.map((layout) => (
        <TableRow key={layout.id}>
          <TableCell align="center">{layout.name}</TableCell>
          <TableCell align="center">{layout.panelsNumber}</TableCell>
          <TableCell align="center">{layout.zonesNumber}</TableCell>
          <TableCell align="center">
            <ActionsMenu
              onDeleteButton={() => {
                setShowModal(true);
                setValueId(layout.id);
              }}
              onEditButton={() =>
                navigate({
                  pathname: getUpdatePanelLayoutRoute(layout.id, {
                    panels: layout.panelsNumber,
                    zones: layout.zonesNumber,
                  }),
                })
              }
              onDuplicateButton={() => onDuplicate(layout.id)}
            />
          </TableCell>
        </TableRow>
      ))}
      <DeleteConfirmationModal
        show={showModal}
        close={() => setShowModal(false)}
        onConfirmation={onDelete}
        delId={valueId}
      />
    </>
  );
};

export default PanelLayoutRow;
