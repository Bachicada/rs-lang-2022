import * as React from 'react';
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