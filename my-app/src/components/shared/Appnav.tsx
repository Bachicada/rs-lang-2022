import * as React from 'react';
import type {} from '@mui/lab/themeAugmentation';

import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles';
import logoImg from '../../assets/rs-logo1.svg';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import BurgerMenu from './Burger-menu';
import { useState, useEffect, useContext } from 'react';
import LogOutBtn from '../autorisation/LogOutBtn';
import { SignInBtn } from '../autorisation/SignInBtn';
import { UserContext } from '../../App';
import { CurUser } from '../../types';
import { Button } from '@mui/material';

const drawerWidth = 280;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export function PersistentDrawerRight() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [userName, setUserName] = useState('Гость');
  const userContext = useContext<{
    user: CurUser;
    dispatchUserEvent: (actionType: string, payload: CurUser) => void;
  }>(UserContext);

  useEffect(() => {
    setUserName(userContext.user.name || 'Гость');
  }, [userContext]);

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* {userContext.user.name ? <LogOutBtn /> : <SignInBtn />} */}
          <img style={{ maxWidth: '125px' }} src={logoImg} alt="app top banner" />

          {/* <Typography variant="h6" noWrap sx={{ flexGrow: 2 }} component="div">
            Здравствуй, {userName}
          </Typography> */}
          <div>
            <Button variant="outlined">Войти</Button>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#171F2B',
            color: '#ffff',
            width: drawerWidth,
          },
        }}
        anchor="right"
        open={open}
        variant="temporary"
        onBackdropClick={handleDrawerClose}
      >
        <DrawerHeader>
          <IconButton sx={{ color: '#ffff' }} onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <BurgerMenu onClick={handleDrawerClose} />
      </Drawer>
    </>
  );
}
