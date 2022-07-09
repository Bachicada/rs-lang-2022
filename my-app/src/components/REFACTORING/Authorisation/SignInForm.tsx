import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { APP_ROUTES } from '../../../utils/Constants';
import { loginUser } from '../../../services/UserService';
import { CustomError, NewUser } from '../../../types/types';
import { Link, useNavigate } from 'react-router-dom';

import styles from './autorisation.module.css';
import { useUserContext } from '../../../store/hooks';
import Loading from '../../shared/Loading';

export default function SignInForm() {
  const [user, dispatch] = useUserContext();
  const [userError, setUserError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  function emailValidation(inputEmail: string) {
    const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (regExp.test(inputEmail)) {
      setEmailError('');
    } else {
      setEmailError('Введите корректный адрес почты');
    }
  }

  const emailHandler = (event: React.SyntheticEvent) => {
    const inputEmail = (event.target as HTMLInputElement).value;
    setEmail(inputEmail);
    emailValidation(inputEmail);
  };

  function passValidation(inputPass: string) {
    if (inputPass && inputPass.length > 7) {
      setPasswordError('');
    } else {
      setPasswordError('Пароль должен содержать минимум 8 символов');
    }
  }

  const passHandler = (event: React.SyntheticEvent) => {
    const inputPass = (event.target as HTMLInputElement).value;
    setPassword(inputPass);
    passValidation(inputPass);
  };

  const handleGuestLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    const currentUser: NewUser = {
      email: 'guest@mail.ru',
      password: 'guest1234',
    };

    updateUser(currentUser);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const data = new FormData(event.currentTarget);

    const currentUser: NewUser = {
      email: data.get('email') as string,
      password: data.get('password') as string,
    };

    updateUser(currentUser);
  };

  const updateUser = async (currentUser: NewUser) => {
    try {
      const dataUser = await loginUser(currentUser);
      const { message, userId, token, refreshToken, name } = dataUser;
      const newUser = { message, userId, token, refreshToken, name };

      localStorage.setItem('CurrentUser', JSON.stringify(newUser));
      dispatch({ type: 'UPDATE_USER', payload: newUser });

      setUserError('');
      navigate(APP_ROUTES.MAIN);
    } catch (e) {
      setUserError((e as CustomError).message);
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 0,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Авторизация
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            error={!!emailError}
            helperText={emailError}
            onChange={emailHandler}
            value={email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Эл.почта"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            error={!!passwordError}
            helperText={passwordError}
            onChange={passHandler}
            value={password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
            disabled={!!passwordError || !!emailError}
          >
            Войти
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2, background: 'darkseagreen' }}
            onClick={handleGuestLogin}
          >
            Гостевой вход
          </Button>

          <Grid container>
            <Grid item>
              <span>Впервые на сайте? </span>
              <Link to={APP_ROUTES.REGFORM}>
                <span className={styles.formLink}>Создать аккаунт</span>
              </Link>
            </Grid>
          </Grid>

          {userError ? <div className={styles.errorBox}>{userError}</div> : null}
        </Box>
      </Box>
    </Container>
  );
}
