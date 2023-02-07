import { TableCell, TableRow } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Advertisement } from '../../models/advertisement';
import convertDate from '../../utils/dateConvert';
import { ActionsMenu } from '../ActionsMenu';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal';

import './AdsTable.css';

export const AdvertisementTable: FC<{
  advertisement: Advertisement;
  onDuplicate: Function;
  onDelete: Function;
  onArchive: Function;
  onUnarchive: Function;
}> = ({ advertisement, onDuplicate, onDelete, onArchive, onUnarchive }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const routeChange = () => {
    const path = `/EditAdvertisement/${advertisement.id}`;
    navigate(path);
  };
  return (
    <>
      <TableRow key={advertisement.name}>
        <TableCell align="center" component="th" scope="row">
          {advertisement.name}
        </TableCell>
        <TableCell align="center">{advertisement.advertisementType}</TableCell>
        <TableCell align="center">{advertisement.createdBy}</TableCell>
        <TableCell align="center">
          {convertDate(advertisement.createdDate)}
        </TableCell>
        <TableCell align="center">{0}</TableCell>
        <TableCell align="center">{advertisement.categoryName}</TableCell>
        <TableCell align="center">
          <ActionsMenu
            onDeleteButton={() => {
              onDelete(advertisement.id);
            }}
            onEditButton={() => routeChange()}
            onDuplicateButton={() => onDuplicate(advertisement.id)}
            onArchiveButton={() => {
              onArchive(advertisement.id!);
            }}
            onUnarchiveButton={() => {
              onUnarchive(advertisement.id!);
            }}
            isArchived={
              advertisement.archive !== null ? advertisement.archive : false
            }
          />
        </TableCell>
      </TableRow>
      <DeleteConfirmationModal
        show={showModal}
        close={() => setShowModal(false)}
        onConfirmation={() => onDelete(advertisement.id)}
        delId={advertisement.id!}
      />
    </>
  );
};
