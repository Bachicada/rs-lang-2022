import * as React from 'react';
import { APP_ROUTES } from '../../utils/Constants';
import { Link, useParams } from 'react-router-dom';
import styles from './textbook.module.css';
import Utils from '../../utils/Utils';
import { Button, Menu, MenuItem } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

export default function GamesMenu() {
  const params = useParams<{ part: string; page: string }>();
  Utils.setParams(params);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
          <Link to={APP_ROUTES.SPRINT} className={styles.gameLink}>
            Спринт
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link to={APP_ROUTES.AUDIOCALL} className={styles.gameLink}>
            Аудиовызов
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
