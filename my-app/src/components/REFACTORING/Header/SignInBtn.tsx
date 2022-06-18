import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../utils/Constants';

const SignInBtn = () => {
  return (
    <Button color="secondary" variant="outlined">
      <Link to={APP_ROUTES.SIGNIN}>Войти</Link>
    </Button>
  );
};

export default SignInBtn;
