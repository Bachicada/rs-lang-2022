import { Toolbar, Button, IconButton } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import logoImg from '../../../assets/rs-logo1.svg';
import React from 'react';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

interface Props {
  open: boolean;
  drawerWidth: number;
  handleDrawerOpen: () => void;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerWidth?: number;
}

const AppBarComponent = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
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

const AppBar = ({ open, handleDrawerOpen, drawerWidth }: Props) => {
  return (
    <AppBarComponent position="fixed" open={open} drawerWidth={drawerWidth}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* {userContext.user.name ? <LogOutBtn /> : <SignInBtn />} */}
        <img style={{ maxWidth: '125px' }} src={logoImg} alt="app top banner" />

        {/* <Typography variant="h6" noWrap sx={{ flexGrow: 2 }} component="div">
            Здравствуй, {userName}
          </Typography> */}
        <div>
          <Button color="secondary" variant="outlined">
            Войти
          </Button>

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
