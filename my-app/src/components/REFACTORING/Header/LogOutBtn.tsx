import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { useUserContext } from '../../../store/hooks';
// import { UserContext } from '../../../App';
import { CurUser } from '../../../types/types';

const LogOutBtn = () => {
  // const { dispatchUserEvent } = useContext<{
  //   user: CurUser;
  //   dispatchUserEvent: (actionType: string, payload: CurUser) => void;
  // }>(UserContext);
  const [, dispatch] = useUserContext();

  function logOut() {
    localStorage.clear();
    dispatch({ type: 'CLEAR_USER', payload: {} });
    // dispatchUserEvent('CLEAR_USER', {});
  }

  return (
    <Button color="secondary" variant="outlined" onClick={logOut}>
      Выйти
    </Button>
  );
};

export default LogOutBtn;
