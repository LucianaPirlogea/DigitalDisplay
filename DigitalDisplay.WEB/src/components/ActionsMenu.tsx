import { IconButton, Menu, MenuItem } from '@mui/material';
import { FC, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  onDeleteButton?: () => void;
  onEditButton?: () => void;
  onDuplicateButton?: () => void;
  onArchiveButton?: () => void;
  onUnarchiveButton?: () => void;
  isArchived?: boolean;
}

export const ActionsMenu: FC<Props> = ({
  onDeleteButton = undefined,
  onEditButton = undefined,
  onDuplicateButton = undefined,
  onArchiveButton = undefined,
  onUnarchiveButton = undefined,
  isArchived = undefined,
}) => {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [archiveValue, setArchiveValue] = useState<boolean>(isArchived!);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuActionsStyle = {
    marginRight: '3px',
  };

  const renderArchiveBtn = (
    isArchived: boolean,
    handleClose: () => void,
    onArchiveButton?: () => void,
    onUnarchiveButton?: () => void
  ) => {
    if (archiveValue && onUnarchiveButton) {
      return (
        <MenuItem
          key={'UNARCHIVE'}
          onClick={() => {
            setArchiveValue(!isArchived);
            onUnarchiveButton();
            handleClose();
          }}
        >
          <ArchiveIcon sx={menuActionsStyle} />
          Unarchive
        </MenuItem>
      );
    }

    if (archiveValue === false && onArchiveButton !== undefined) {
      return (
        <MenuItem
          key={'ARCHIVE'}
          onClick={() => {
            setArchiveValue(!isArchived);
            onArchiveButton();
            handleClose();
          }}
        >
          <ArchiveIcon sx={menuActionsStyle} />
          Archive
        </MenuItem>
      );
    }

    return <></>;
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        color="success"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {onDeleteButton !== undefined && (
          <MenuItem
            key={'DELETE'}
            onClick={() => {
              onDeleteButton();
              handleClose();
            }}
          >
            <DeleteIcon sx={menuActionsStyle} />
            Delete
          </MenuItem>
        )}
        {onEditButton !== undefined && (
          <MenuItem
            key={'EDIT'}
            onClick={() => {
              onEditButton();
              handleClose();
            }}
          >
            <EditIcon sx={menuActionsStyle} />
            Edit
          </MenuItem>
        )}
        {onDuplicateButton !== undefined && (
          <MenuItem
            key={'DUPLICATE'}
            onClick={() => {
              onDuplicateButton();
              handleClose();
            }}
          >
            <FileCopyIcon sx={menuActionsStyle} />
            Duplicate
          </MenuItem>
        )}
        {renderArchiveBtn(
          isArchived!,
          handleClose,
          onArchiveButton,
          onUnarchiveButton
        )}
      </Menu>
    </div>
  );
};
