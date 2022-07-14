import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { APP_ROUTES } from '../../utils/Constants';
import SegmentIcon from '@mui/icons-material/Segment';

const PARTS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Сложные'];

const TextbookPartsMenu = () => {
  const params = useParams<string>();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePartClick = (part: number, partTitle: string) => {
    const path =
      partTitle === 'Сложные'
        ? `${APP_ROUTES.TEXTBOOK}/hardwords`
        : `${APP_ROUTES.TEXTBOOK}/${part}/${params.page}`;
    navigate(path);
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="secondary"
        endIcon={<SegmentIcon />}
      >
        Разделы учебника
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {PARTS.map((part, idx) => (
          <MenuItem key={idx} onClick={() => handlePartClick(idx, part)}>
            {part}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default TextbookPartsMenu;
