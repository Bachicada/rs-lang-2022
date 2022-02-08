import * as React from 'react';
import type {} from '@mui/lab/themeAugmentation';

import { createTheme, styled, ThemeProvider, useTheme } from '@mui/material/styles';

import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import BurgerMenu from './Burger-menu';
import TransitionsModal from '../autorisation/SignIn-Btn';
import { CurrentUser } from '../../utils/Constants';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const style = {
  innerHeight: '40',
  bgcolor: '#5393E1',
  textAlign: 'right',
};


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

  // necessary for content to be below app bar
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

  const checkUser =()=>{
    let greetingName:string;
    if (localStorage.getItem('CurrentUser')){
      const userObj = localStorage.getItem('CurrentUser');
      const user = JSON.parse(userObj || '{}');
      greetingName = user.name;
    }
    else {greetingName = CurrentUser.name} 
    return greetingName;
}

  return (
    <div>
       <AppBar sx={style} position="fixed" open={open}>
        <Toolbar>
          <TransitionsModal />
          <Typography variant="h6" noWrap sx={{ flexGrow: 2 }} component="div">
            Здравствуй, {checkUser()}
          </Typography>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Меню
          </Typography>
         
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    
      <Drawer
        sx={{
          
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            backgroundColor:'#171F2B',
            color:'#ffff',
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton sx={{color:'#ffff'}} onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
       
        </DrawerHeader>
        <BurgerMenu />
      </Drawer>
      </div>
  );
}