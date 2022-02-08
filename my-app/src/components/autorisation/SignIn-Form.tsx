import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import RegRorm from './RegisterForm';

const theme = createTheme();

export default function SignIn() { 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
                <Link href="#" variant="body2" id='RegFormBtn' >
                  {"Создать аккаунт"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


/*import * as React from 'react';
import styles from './autorisation.module.css'
import { FormControl, InputLabel, Input, TextField} from '@mui/material';
import ReactDOM from 'react-dom';


function renderSignInForm(){
    ReactDOM.render(
        <SignInForm/>,
        document.getElementById('popupForm')
      );
} 

export function RegisterForm () {
        return (
            <FormControl>
            <TextField
               className = {styles.inputForm}
               id='usersNick'
               type='text'
               label='Name'
            >
            </TextField >
            <TextField
               className = {styles.inputForm}
               id='newEmail'
               type='email'
               label="Email"
            >
            </TextField >
            <TextField
                className = {styles.inputForm}
               id='newPassword'
               type='password'
               label="Password"
            >
            </TextField >
            <button className={styles.formBtn}>Зарегистироваться</button>
            <p> Уже есть аккаунт? <span onClick={renderSignInForm} className={styles.createLink}>Войти</span></p>
         </FormControl>
        )
}

export default class SignInForm extends React.Component {
    renderRegForm(){
        ReactDOM.render(
            <RegisterForm/>,
            document.getElementById('popupForm')
          );
    }
    render(){
      
        return (
            <FormControl>
               <TextField
                  className = {styles.inputForm}
                  id='usersEmail'
                  type='email'
                  label="Email"
               >
               </TextField >
               <TextField
                   className = {styles.inputForm}
                  id='usersPassword'
                  type='password'
                  label="Password"
               >
               </TextField >
               <button className={styles.formBtn}>войти</button>
               <p>Впервые на сайте? <span onClick={this.renderRegForm} className={styles.createLink}>Создать аккаунт</span></p>
            </FormControl>
        )
    }
}
*/