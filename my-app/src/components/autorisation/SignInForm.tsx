import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { APP_ROUTES } from '../../utils/Constants';
import { loginUser } from '../../services/UserService';
import { CurUser, NewUser } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingIcon } from '../shared/LoadingIcon';

import styles from './autorisation.module.css';
import { UserContext } from '../../App';

const theme = createTheme();

export default function SignInForm() {
  const [validUser, setValidUser] = useState(true);

  const userInfo: CurUser = {};

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');

  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);
  const [passErrorText, setPassErrorText] = useState('');

  function emailValidation(inputEmail: string) {
    const regEm = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regEm.test(inputEmail)) {
      setEmailError(false);
      setEmailErrorText('');
    } else {
      setEmailError(true);
      setEmailErrorText('Введите корректный адрес почты');
    }
  }

  const emailHandler = (event: React.SyntheticEvent) => {
    const inputEmail = (event.target as HTMLInputElement).value;
    setEmail(inputEmail);
    emailValidation(inputEmail);
  };

  function passValidation(inputPass: string) {
    if (inputPass && inputPass.length > 7) {
      setPassError(false);
      setPassErrorText('');
    } else {
      setPassError(true);
      setPassErrorText('Пароль должен содержать минимум 8 символов');
    }
  }

  const passHandler = (event: React.SyntheticEvent) => {
    const inputPass = (event.target as HTMLInputElement).value;
    setPassword(inputPass);
    passValidation(inputPass);
  };

  const { dispatchUserEvent } = React.useContext<{
    user: CurUser;
    dispatchUserEvent: (actionType: string, payload: CurUser) => void;
  }>(UserContext);

  const [loadingState, setLoadingState] = useState(false);

  const handleGuestLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    const curUser: NewUser = {
      email: 'guest@mail.ru',
      password: 'guest1234',
    };

    const dataUser = await loginUser(curUser);
    updateUser(dataUser);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const curUser: NewUser = {
      email: data.get('email') as string,
      password: data.get('password') as string,
    };

    const dataUser = await loginUser(curUser);
    updateUser(dataUser);
  };

  const updateUser = async (dataUser: void | Response | undefined) => {
    if (dataUser) {
      const currentUser = (await dataUser.json()) as CurUser;

      userInfo.message = currentUser.message;
      userInfo.userId = currentUser.userId;
      userInfo.token = currentUser.token;
      userInfo.refreshToken = currentUser.refreshToken;
      userInfo.name = currentUser.name;

      localStorage.setItem('CurrentUser', JSON.stringify(userInfo));
      dispatchUserEvent('UPDATE_USER', userInfo);
      setValidUser(true);
      setLoadingState(true);
      navigate(APP_ROUTES.MAIN);
    } else {
      setValidUser(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
              error={emailError}
              helperText={emailErrorText}
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
              error={passError}
              helperText={passErrorText}
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
              disabled={passError || emailError}
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
            {validUser ? '' : <div className={styles.errorBox}>Неверный логин/пароль</div>}
            {loadingState ? <LoadingIcon /> : ''}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
