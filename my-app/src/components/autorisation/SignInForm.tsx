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
import { Link , useNavigate} from 'react-router-dom';
import {useLocalStorage} from '../../services/HookLocalStorage'
import styles from './Autorisation.module.css';

const theme = createTheme();

export default function SignInForm() { 

  const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      // eslint-disable-next-line no-console
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
     
      const curUser: NewUser = {
        email: data.get('email') as string,
        password: data.get('password') as string
      }
      
      const dataUser = await loginUser(curUser);
  
      const userInfo: CurUser = {};
  
      if (dataUser){
          userInfo.userId = dataUser.userId;
          userInfo.token = dataUser.token;
          userInfo.name = dataUser.name;
          localStorage.setItem('CurrentUser', JSON.stringify(userInfo));
          console.log(userInfo);
          navigate(`${APP_ROUTES.MAIN}`);
      }
    };
    
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
               Авторизация
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
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
                Войти
              </Button>
              <Grid container>
                <Grid item>
                  <span>Впервые на сайте? </span>
                  <Link to={APP_ROUTES.REGFORM}>
                    <span className={styles.formLink}>Создать аккаунт</span>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
  
    );
  }
  