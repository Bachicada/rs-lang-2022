import { Button, Stack, styled } from '@mui/material';

type Props = {
  answers: string[];
  correctAnswer: string;
  dispatchAnswer: (isAnswerCorrect: boolean) => void;
};

const GameBtns = ({ answers, correctAnswer, dispatchAnswer }: Props) => {
  return (
    <StyledStack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
      {answers.map((word: string, id: number) => {
        const isCorrect = word === correctAnswer;

        return (
          <Button
            key={id}
            variant="outlined"
            color="secondary"
            onClick={() => dispatchAnswer(isCorrect)}
          >
            {word}
          </Button>
        );
      })}
    </StyledStack>
  );
};

const StyledStack = styled(Stack)`
  @media (max-width: 599.9px) {
    width: 100%;
  }
`;

export default GameBtns;
