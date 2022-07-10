import { FC, PropsWithChildren, useEffect, useState } from 'react';
import Loading from '../components/shared/Loading';
import { getNewUserToken, getUser } from '../services/UserService';
import { useUserContext } from '../store/hooks';
import { CustomError } from '../types/types';

const UserChecker: FC<PropsWithChildren> = ({ children }) => {
  const [user, dispatch] = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser') || '{}');
    if (!Object.keys(currentUser).length) {
      return;
    }

    const { token, refreshToken, userId } = currentUser;

    const checkUser = async () => {
      setIsLoading(true);
      try {
        await getUser({ token, userId });
        dispatch({ type: 'UPDATE_USER', payload: currentUser });
        setIsLoading(false);
      } catch (e) {
        alert((e as CustomError).message);
        await getRefreshToken();
      }
    };

    const getRefreshToken = async () => {
      setIsLoading(true);
      try {
        const newToken = await getNewUserToken({ refreshToken, userId });
        dispatch({
          type: 'UPDATE_USER',
          payload: {
            userId: newToken.userId,
            refreshToken: newToken.refreshToken,
          },
        });
        setIsLoading(false);
      } catch (e) {
        alert((e as CustomError).message);
        dispatch({ type: 'CLEAR_USER' });
        localStorage.removeItem('CurrentUser');
        setIsLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  // {/* <ModalExpire open={expireStatus} /> */}
  return <>{children}</>;
};

export default UserChecker;
