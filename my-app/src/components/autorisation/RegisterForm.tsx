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
import {createUser} from '../../services/UserService';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import { NewUser } from '../../types';
import { APP_ROUTES } from '../../utils/Constants';
import styles from './Autorisation.module.css';


const theme = createTheme();

export default function RegForm() {
  const [regError, setError] = useState('');

  const [name, setName]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameClick, setNameClicked] = useState(false);
  const [emailClick, setEmailClicked] = useState(false)
  const [passwordClick, setPasswordClicked] = useState(false)

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('Укажите адрес почты');
  const [passError, setPassError] = useState('Обязательно придумайте пароль');
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newUser={
      name: data.get('userName') as string,
      email: data.get('email') as string,
      password: data.get('password') as string
    }
    const user: NewUser = {};
    const newData: void | Response| undefined = await createUser(newUser);
    
    console.log(`newData`, newData)
    if (newData){
      const newInfo = await newData.json();
        user.userId = newInfo.id;
        user.name = newInfo.name;
        user.email = newInfo.email;
        localStorage.setItem('CurrentUser', JSON.stringify(user));
        console.log(newInfo)
    }
    else {
      console.log('Aккаунт уже существует. Попробуйте войти')
    }
  }
  
  const blurCheck = (event: React.SyntheticEvent) => {
    const inputField = (event.target as HTMLInputElement).name;
    if (inputField==='name'){
      setNameClicked(true)
    }
    if (inputField==='email'){
      setEmailClicked(true)
    } 
    else if (inputField==='password'){
      setPasswordClicked(true)
    }
  }

  const nameHandler = (event: React.SyntheticEvent) =>{
    const inputName = (event.target as HTMLInputElement).value;
    if (inputName.length <4){
      setNameError('Пожалуйста, укажите Имя');
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginBottom:8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 0
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
             Регистрация
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate id='formBox'>
            {(nameError && nameClick) && <div>{nameError}</div>}
          <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Имя"
              name="userName"
              onChange={nameHandler}
              onBlur={blurCheck}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Адрес email"
              name="email"
              autoComplete="email"
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Создать аккаунт
            </Button>
            <Grid container>
              <Grid item>
                <span>Уже есть аккаунт?</span>
                <Link to={APP_ROUTES.SIGNIN}>
                   <span className={styles.formLink}>Войти</span>
                </Link>
              </Grid>
            </Grid>
            <div ></div>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
