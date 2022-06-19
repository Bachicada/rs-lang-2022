import { Button, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../utils/Constants';

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const SignInBtn = () => {
  return (
    <Button color="secondary" variant="outlined">
      <StyledLink to={APP_ROUTES.SIGNIN}>Войти</StyledLink>
    </Button>
  );
};

export default SignInBtn;
