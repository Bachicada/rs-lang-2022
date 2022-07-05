import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useUserContext } from '../store/hooks';

const UserChecker: FC<PropsWithChildren> = ({ children }) => {
  const [user, dispatch] = useUserContext();

  useEffect(() => {
    dispatch({
      type: 'UPDATE_USER',
      payload: JSON.parse(localStorage.getItem('CurrentUser') || '{}'),
    });
  }, [dispatch]);

  return <>{children}</>;
};

export default UserChecker;
