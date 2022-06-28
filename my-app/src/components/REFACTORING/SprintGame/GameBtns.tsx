import React, { Dispatch, SetStateAction } from 'react';
import { BtnsWrapper, StyledBtn } from '../Game/styles';

type Props = {
  question: any;
  setIsAnswered: Dispatch<SetStateAction<boolean>>;
  setIsAnswerCorrect: Dispatch<SetStateAction<boolean>>;
};

const GameBtns = ({ question, setIsAnswered, setIsAnswerCorrect }: Props) => {
  const handleIncorrect = () => {
    setIsAnswerCorrect(question.correct ? false : true);
    setIsAnswered(true);
  };

  const handleCorrect = () => {
    setIsAnswerCorrect(question.correct ? true : false);
    setIsAnswered(true);
  };

  return (
    <BtnsWrapper>
      <StyledBtn variant="outlined" color="error" onClick={handleIncorrect}>
        Неверно
      </StyledBtn>

      <StyledBtn variant="outlined" color="success" onClick={handleCorrect}>
        Верно
      </StyledBtn>
    </BtnsWrapper>
  );
};

export default GameBtns;
