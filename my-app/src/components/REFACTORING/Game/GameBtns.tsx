import { Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  question: any;
  setIsAnswered: Dispatch<SetStateAction<boolean>>;
  setIsAnswerCorrect: Dispatch<SetStateAction<boolean>>;
};

const GameBtns = ({ question, setIsAnswered, setIsAnswerCorrect }: Props) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      {/* #02722b #a10d0d */}
      <Button
        sx={{ color: '#a10d0d !important' }}
        variant="outlined"
        color="error"
        style={{ width: '200px', height: '70px' }}
        onClick={() => {
          setIsAnswerCorrect(question.correct ? false : true);
          setIsAnswered(true);
        }}
      >
        Неверно
      </Button>

      <Button
        sx={{ color: '#02722b !important' }}
        variant="outlined"
        color="success"
        style={{ width: '200px', height: '70px' }}
        onClick={() => {
          setIsAnswerCorrect(question.correct ? true : false);
          setIsAnswered(true);
        }}
      >
        Верно
      </Button>
    </div>
  );
};

export default GameBtns;
