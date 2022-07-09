import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createUser, loginUser } from '../../services/UserService';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomError, NewUser } from '../../types/types';
import { APP_ROUTES } from '../../utils/Constants';
import styles from './autorisation.module.css';
import { useUserContext } from '../../store/hooks';
import Loading from '../shared/Loading';
import { styled } from '@mui/material';

export default function RegForm() {
  const navigate = useNavigate();
  function checkLocation() {
    setTimeout(() => {
      navigate(-2);
    }, 2000);
  }

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [userError, setUserError] = useState('');
  const [user, dispatch] = useUserContext();

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function nameValidation(inputName: string) {
    if (inputName && inputName.length > 3) {
      setNameError('');
    } else {
      setNameError('Имя должно содержать более 3х символов');
    }
  }

  const nameHandler = (event: React.SyntheticEvent) => {
    const inputName = (event.target as HTMLInputElement).value;
    setName(inputName);
    nameValidation(inputName);
  };

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newUser = {
      name: data.get('userName') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    };

    updateUser(newUser);
  };

  const updateUser = async (newUser: NewUser) => {
    try {
      const dataUser = await createUser(newUser);
      const userInfo = await loginUser(dataUser);

      localStorage.setItem('CurrentUser', JSON.stringify(userInfo));
      dispatch({ type: 'UPDATE_USER', payload: userInfo });

      setUserError('');
      setSuccess(true);
      checkLocation();
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
      <StyledBox
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
            error={!!nameError}
            helperText={nameError}
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
            error={!!emailError}
            helperText={emailError}
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
            sx={{ mt: 3, mb: 2 }}
            disabled={!!passwordError || !!nameError || !!emailError || success}
          >
            {success ? 'Регистрация завершена' : 'Создать аккаунт'}
          </Button>

          <Grid container>
            <Grid item>
              <span>Уже есть аккаунт?</span>
              <Link to={APP_ROUTES.SIGNIN}>
                <StyledSpan>Войти</StyledSpan>
              </Link>
            </Grid>
          </Grid>

          {userError ? <ErrorBox>{userError}</ErrorBox> : ''}
        </Box>
      </StyledBox>
    </Container>
  );
}

const StyledSpan = styled('span')`
  margin-left: 10px;
  color: blue;
`;

const StyledBox = styled(Box)`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgb(0 0 0 / 14%);
  background-color: #ffffff9c;
  cursor: pointer;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  margin-top: 20px;
`;

const ErrorBox = styled('div')`
  margin-top: 15px;
  background-color: #eca48c;
  color: rgba(0, 0, 0, 0.582);
  font-size: 1.3em;
  border-radius: 10px;
  border: 2px solid #ec5a2a;
  text-align: center;
`;
