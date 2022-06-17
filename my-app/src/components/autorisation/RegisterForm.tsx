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
import { createUser, loginUser } from '../../services/UserService';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CurUser, NewUser } from '../../types';
import { APP_ROUTES } from '../../utils/Constants';
import styles from './autorisation.module.css';
import { UserContext } from '../../App';
import { LoadingIcon } from '../shared/LoadingIcon';

const theme = createTheme();

export default function RegForm() {
  const navigate = useNavigate();
  function checkLocation() {
    navigate(-2);
  }

  const [success, setSuccess] = useState(false);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');

  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState(false);
  const [passErrorText, setPassErrorText] = useState('');

  function nameValidation(inputName: string) {
    if (inputName && inputName.length > 3) {
      setNameError(false);
      setNameErrorText('');
    } else {
      setNameError(true);
      setNameErrorText('Имя должно содержать более 3х символов');
    }
  }

  const nameHandler = (event: React.SyntheticEvent) => {
    const inputName = (event.target as HTMLInputElement).value;
    setName(inputName);
    nameValidation(inputName);
  };

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

  const [alreadyRegError, setAlreadyRegError] = useState(false);
  const [loadingState, setLoadingState] = useState(false);

  const userContext = useContext<{
    user: CurUser;
    dispatchUserEvent: any;
  }>(UserContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newUser = {
      name: data.get('userName') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    };
    const user: CurUser = {};

    const newData: void | Response | undefined = await createUser(newUser);
    setLoadingState(true);

    if (newData) {
      const dataUser = await loginUser(newUser);

      if (dataUser) {
        const currentUser = await dataUser.json();
        user.message = currentUser.message;
        user.userId = currentUser.userId;
        user.token = currentUser.token;
        user.refreshToken = currentUser.refreshToken;
        user.name = currentUser.name;
        localStorage.setItem('CurrentUser', JSON.stringify(user));
        userContext.dispatchUserEvent('UPDATE_USER', user);
      }
      setAlreadyRegError(false);
      setSuccess(true);
      setLoadingState(true);
      setTimeout(checkLocation, 1500);
    } else {
      setLoadingState(true);
      setAlreadyRegError(true);
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
            Регистрация
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate id="formBox">
            <TextField
              error={nameError}
              helperText={nameErrorText}
              onChange={nameHandler}
              value={name}
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Имя"
              name="userName"
              autoFocus
            />
            <TextField
              error={emailError}
              helperText={emailErrorText}
              onChange={emailHandler}
              value={email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Адрес email"
              name="email"
              autoComplete="email"
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
            {success ? (
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: '#19d219' }}
                disabled={passError || nameError || emailError}
              >
                Регистрация завершена
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={passError || nameError || emailError}
              >
                Создать аккаунт
              </Button>
            )}

            <Grid container>
              <Grid item>
                <span>Уже есть аккаунт?</span>
                <Link to={APP_ROUTES.SIGNIN}>
                  <span className={styles.formLink}>Войти</span>
                </Link>
              </Grid>
            </Grid>
            {alreadyRegError ? (
              <div className={styles.errorBox}>Aккаунт уже существует. Попробуйте войти</div>
            ) : (
              ''
            )}
            {loadingState ? <LoadingIcon /> : ''}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
