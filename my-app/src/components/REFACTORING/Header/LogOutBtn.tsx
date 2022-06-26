import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { UserContext } from '../../../App';
import { CurUser } from '../../../types/types';

const LogOutBtn = () => {
  const { dispatchUserEvent } = useContext<{
    user: CurUser;
    dispatchUserEvent: (actionType: string, payload: CurUser) => void;
  }>(UserContext);

  function logOut() {
    localStorage.clear();
    dispatchUserEvent('CLEAR_USER', {});
  }

  return (
    <Button color="secondary" variant="outlined" onClick={logOut}>
      Выйти
    </Button>
  );
};

export default LogOutBtn;
