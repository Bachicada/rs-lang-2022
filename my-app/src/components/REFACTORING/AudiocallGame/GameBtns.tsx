import { Button, Stack, styled } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  answers: string[];
  correctAnswer: string;
  setIsAnswered: Dispatch<SetStateAction<boolean>>;
  setIsAnswerCorrect: Dispatch<SetStateAction<boolean>>;
};

const StyledStack = styled(Stack)`
  @media (max-width: 599.9px) {
    width: 100%;
  }
`;

const GameBtns = ({ answers, correctAnswer, setIsAnswered, setIsAnswerCorrect }: Props) => {
  const handleClick = (isCorrect: boolean) => {
    setIsAnswerCorrect(isCorrect);
    setIsAnswered(true);
  };

  return (
    <StyledStack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
      {answers.map((word: string, id: number) => {
        const isCorrect = word === correctAnswer;
        return (
          <Button
            key={id}
            variant="outlined"
            color="secondary"
            onClick={() => handleClick(isCorrect)}
          >
            {word}
          </Button>
        );
      })}
    </StyledStack>
  );
};

export default GameBtns;
