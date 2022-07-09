import { useScrollTrigger } from '@mui/material';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../store/hooks';
import AppBar from './AppBar';
import DrawerComponent from './DrawerComponent';

const drawerWidth = 330;

const Header = () => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('Гость');

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const [userContext, dispatch] = useUserContext();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setUserName(userContext.name || 'Гость');
  }, [userContext]);

  return (
    <>
      <AppBar
        open={open}
        drawerWidth={drawerWidth}
        userName={userContext.name}
        scrollTrigger={scrollTrigger}
        handleDrawerOpen={handleDrawerOpen}
      />
      <DrawerComponent
        open={open}
        drawerWidth={drawerWidth}
        userName={userName}
        handleDrawerClose={handleDrawerClose}
      />
    </>
  );
};

export default Header;
