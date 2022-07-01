import { Button, Stack, styled } from '@mui/material';

type StarProps = {
  correct?: string | undefined;
};

export const StyledStack = styled(Stack)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

export const BtnsWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 450px;
`;

export const StyledBtn = styled(Button)`
  width: 200px;
  height: 70px;
`;

export const ScoreWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const StarsWrapper = styled('div')`
  display: flex;
  justify-content: space-around;
  align-self: center;
`;

export const StyledStar = styled('div')(
  ({ correct }: StarProps) => `
  width: fit-content;
  opacity: 1;
  animation: ${correct ? 'stretch-bounce 0.5s ease-in-out' : null};
  transition: 0.3s ease-out;
  filter: ${!correct ? 'grayscale(1)' : 'none'};
  font-size: 2rem;
`
);
