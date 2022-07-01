import { Toolbar, IconButton } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import logoImg from '../../../assets/rs-logo1.svg';
import logoImg from '../../../assets/rslang-logo1.png';
import React from 'react';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import LogOutBtn from './LogOutBtn';
import SignInBtn from './SignInBtn';

interface Props {
  open: boolean;
  drawerWidth: number;
  userName: string | undefined;
  scrollTrigger: boolean;
  handleDrawerOpen: () => void;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerwidth?: number;
  scrolltrigger?: string | undefined;
}

const AppBarComponent = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, drawerwidth, scrolltrigger }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: 'transparent',
  boxShadow: 'none',

  ...(open && {
    width: `calc(100% - ${drawerwidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerwidth,
  }),
  ...(scrolltrigger && {
    transition: '.3s',
    background: '#ffffffad',
  }),
}));

const AppBar = ({ open, drawerWidth, userName, scrollTrigger, handleDrawerOpen }: Props) => {
  return (
    <AppBarComponent
      position="fixed"
      open={open}
      drawerwidth={drawerWidth}
      scrolltrigger={scrollTrigger ? 'true' : undefined}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <img style={{ maxWidth: '125px' }} src={logoImg} alt="app top banner" />

        <div>
          {userName ? <LogOutBtn /> : <SignInBtn />}

          <IconButton
            color="secondary"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBarComponent>
  );
};

export default AppBar;
