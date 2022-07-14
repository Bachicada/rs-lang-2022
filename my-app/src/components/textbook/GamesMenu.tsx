import { APP_ROUTES } from '../../utils/Constants';
import { Link, useParams } from 'react-router-dom';
import Utils from '../../utils/Utils';
import { Button, Menu, MenuItem, styled } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useState } from 'react';

export default function GamesMenu() {
  const params = useParams<{ part: string; page: string }>();
  Utils.setParams(params);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        endIcon={<SportsEsportsIcon />}
      >
        Игры
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
        <MenuItem onClick={handleClose}>
          <StyledLink to={APP_ROUTES.SPRINT}>Спринт</StyledLink>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <StyledLink to={APP_ROUTES.AUDIOCALL}>Аудиовызов</StyledLink>
        </MenuItem>
      </Menu>
    </div>
  );
}

const StyledLink = styled(Link)`
  color: #000;
`;
