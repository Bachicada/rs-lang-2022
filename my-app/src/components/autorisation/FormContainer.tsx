import * as React from 'react';
import SignInForm from './SignIn-Form';
import RegForm from './RegisterForm';
import { FormProps } from '../../types';

export default function FormContainer(props: FormProps) {
    const constUser = props.hasAccount;
    if (constUser) {
      return <SignInForm />;
    }
    return <RegForm />;
  }