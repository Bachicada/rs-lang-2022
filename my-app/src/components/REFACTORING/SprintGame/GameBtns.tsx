import { useCallback, useEffect } from 'react';
import { BtnsWrapper, StyledBtn } from '../Game/styles';
import correctAudioSrc from '../../../assets/correct.mp3';
import incorrectAudioSrc from '../../../assets/incorrect.mp3';

const correctAudio = new Audio(correctAudioSrc);
const incorrectAudio = new Audio(incorrectAudioSrc);

type Props = {
  isCorrect: boolean;
  dispatchAnswer: (isCorrect: boolean) => void;
};

const GameBtns = ({ isCorrect, dispatchAnswer }: Props) => {
  const handleCorrectClick = useCallback(() => {
    const isAnswerCorrect = isCorrect ? true : false;
    isAnswerCorrect ? correctAudio.play() : incorrectAudio.play();

    dispatchAnswer(isAnswerCorrect);
  }, [dispatchAnswer, isCorrect]);

  const handleIncorrectClick = useCallback(() => {
    const isAnswerCorrect = !isCorrect ? true : false;
    isAnswerCorrect ? correctAudio.play() : incorrectAudio.play();

    dispatchAnswer(isAnswerCorrect);
  }, [dispatchAnswer, isCorrect]);

  const handleClick = useCallback((btnValue: boolean) => {
    const isAnswerCorrect = btnValue === isCorrect;
    isAnswerCorrect ? correctAudio.play() : incorrectAudio.play();

    dispatchAnswer(isAnswerCorrect);
  }, []);

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleCorrectClick();
      }
      if (e.key === 'ArrowLeft') {
        handleIncorrectClick();
      }
    };

    document.addEventListener('keydown', keyDown);
    return () => {
      document.removeEventListener('keydown', keyDown);
    };
  }, [handleCorrectClick, handleIncorrectClick]);

  return (
    <BtnsWrapper>
      <StyledBtn variant="outlined" color="error" onClick={handleIncorrectClick}>
        Неверно
      </StyledBtn>

      <StyledBtn variant="outlined" color="success" onClick={handleCorrectClick}>
        Верно
      </StyledBtn>
    </BtnsWrapper>
  );
};

export default GameBtns;
