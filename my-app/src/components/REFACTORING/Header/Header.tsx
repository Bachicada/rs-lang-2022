import { useScrollTrigger } from '@mui/material';
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useUserContext } from '../../../store/hooks';
// import { UserContext } from '../../../App';
import { CurUser } from '../../../types/types';
import AppBar from './AppBar';
import DrawerComponent from './DrawerComponent';

const drawerWidth = 330;

const Header = () => {
  // const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('Гость');

  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  // const userContext = useContext<{
  //   user: CurUser;
  //   dispatchUserEvent: (actionType: string, payload: CurUser) => void;
  // }>(UserContext);

  const [userContext, dispatch] = useUserContext();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // setUserName(userContext.user.name || 'Гость');
    setUserName(userContext.name || 'Гость');
  }, [userContext]);

  return (
    <>
      <AppBar
        open={open}
        drawerWidth={drawerWidth}
        // userName={userContext.user.name}
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
