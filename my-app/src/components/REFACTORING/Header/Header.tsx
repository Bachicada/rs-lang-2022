import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';
import { CurUser } from '../../../types';
import AppBar from './AppBar';
import DrawerComponent from './DrawerComponent';

const drawerWidth = 280;

const Header = () => {
  // const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('Гость');

  const userContext = useContext<{
    user: CurUser;
    dispatchUserEvent: (actionType: string, payload: CurUser) => void;
  }>(UserContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setUserName(userContext.user.name || 'Гость');
  }, [userContext]);

  return (
    <>
      <AppBar
        open={open}
        drawerWidth={drawerWidth}
        userName={userContext.user.name}
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
