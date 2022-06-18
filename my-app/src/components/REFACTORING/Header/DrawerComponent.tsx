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
  handleDrawerClose: () => void;
}

const DrawerComponent = ({ drawerWidth, handleDrawerClose, open }: Props) => {
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

      <DrawerContent onClick={handleDrawerClose} />
    </Drawer>
  );
};

export default DrawerComponent;
