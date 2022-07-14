import { FC, PropsWithChildren, useEffect, useState } from 'react';
import Loading from '../components/shared/Loading';
import Toast from '../components/shared/Toast';
import { getNewUserToken, getUser } from '../services/UserService';
import { useUserContext } from '../store/hooks';

const UserChecker: FC<PropsWithChildren> = ({ children }) => {
  const [, dispatch] = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

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
        setOpen(true);
        dispatch({ type: 'CLEAR_USER' });
        localStorage.removeItem('CurrentUser');
        setIsLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Toast open={open} title={'Ваша сессия истекла. Повторите попытку входа'} setOpen={setOpen} />
      {children}
    </>
  );
};

export default UserChecker;
