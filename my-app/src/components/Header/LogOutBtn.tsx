import { Button } from '@mui/material';
import { useUserContext } from '../../store/hooks';

const LogOutBtn = () => {
  const [, dispatch] = useUserContext();

  function logOut() {
    localStorage.clear();
    dispatch({ type: 'CLEAR_USER', payload: {} });
  }

  return (
    <Button color="secondary" variant="outlined" onClick={logOut}>
      Выйти
    </Button>
  );
};

export default LogOutBtn;
