import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {createUser} from '../../services/UserService';
import { CurrentUser } from '../../utils/Constants';
import { useState } from 'react';
import { create } from 'domain';


const theme = createTheme();

export default function RegRorm() {
  /*const [name, setName]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nameError, setNameError] = useState('Пожалуйста, укажите Имя');
  const [emailError, setEmailError] = useState('Укажите адрес почты');
  const [passError, setPassError] = useState('Обязательно придумайте пароль');
  */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const newUser={
      'name': data.get('userName') as string,
      'email': data.get('email') as string,
      'password': data.get('password') as string
    }
 

    const newData: void | Response| undefined = await createUser(newUser);
    if (newData){
      const newInfo = await newData.json();
        CurrentUser.id = newInfo.id;
        CurrentUser.name = newInfo.name;
        CurrentUser.email = newInfo.email;
        localStorage.setItem('CurrentUser', JSON.stringify(CurrentUser));
        console.log(newInfo)
    }
    else {
      console.log('Возможно, аккаунт уже существует. Попробуйте войти')
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
          <Box component="form" onSubmit={handleSubmit} noValidate >
          <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="Имя"
              name="userName"
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
                <Link href="#" variant="body2" id='signInBtn'>
                  {" Войти"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
