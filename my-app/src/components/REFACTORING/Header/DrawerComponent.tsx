import { Drawer, IconButton } from '@mui/material';
import React from 'react';
import theme from '../../../theme';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';

interface Props {
  drawerWidth: number;
  open: boolean;
  userName: string;
  handleDrawerClose: () => void;
}

const DrawerComponent = ({ drawerWidth, userName, open, handleDrawerClose }: Props) => {
  return (
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

      <DrawerContent handleDrawerClose={handleDrawerClose} userName={userName} />
    </Drawer>
  );
};

export default DrawerComponent;
