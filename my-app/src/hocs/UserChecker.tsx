import React, { FC, PropsWithChildren, useEffect } from 'react';
import { getNewUserToken } from '../services/UserService';
import { useUserContext } from '../store/hooks';

const UserChecker: FC<PropsWithChildren> = ({ children }) => {
  const [user, dispatch] = useUserContext();

  useEffect(() => {
    dispatch({
      type: 'UPDATE_USER',
      payload: JSON.parse(localStorage.getItem('CurrentUser') || '{}'),
    });
  }, [dispatch]);
  // useEffect(() => {
  //   const currentUserJSON = localStorage.getItem('CurrentUser');
  //   if (!currentUserJSON) {
  //     return;
  //   }
  //   const currentUser = JSON.parse(currentUserJSON);
  //   const { refreshToken, userId } = currentUser;

  //   console.log(currentUser);
  //   try {
  //     getNewUserToken({ refreshToken, userId }).then((tokens) => {
  //       dispatch({
  //         type: 'UPDATE_USER',
  //         payload: tokens,
  //       });
  //     });
  //   } catch (e) {
  //     alert('LOGIN AGAIN');
  //     dispatch({ type: 'CLEAR_USER' });
  //     localStorage.removeItem('CurrentUser');
  //   }
  // }, [dispatch]);

  // {/* <ModalExpire open={expireStatus} /> */}
  return <>{children}</>;
};

export default UserChecker;
