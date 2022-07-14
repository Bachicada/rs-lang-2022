import AboutApp from './AboutApp';
import { Benefits } from './Benefits';
import { Team } from './Team';
import { styled } from '@mui/material';

export default function Landing() {
  return (
    <Container>
      <AboutApp />
      <Benefits />
      <Team />
    </Container>
  );
}

const Container = styled('div')`
  padding: 24px;
`;
