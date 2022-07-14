import React from 'react';
import { styled } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

const Container = styled('div')`
  position: absolute;
  width: auto;
  height: auto;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1150;
}
`;

export default Loading;
