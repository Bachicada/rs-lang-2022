import { useCallback, useEffect, useState } from 'react';
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
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = useCallback(
    (btnValue: boolean) => {
      const isAnswerCorrect = btnValue === isCorrect;
      isAnswerCorrect ? correctAudio.play() : incorrectAudio.play();

      dispatchAnswer(isAnswerCorrect);
    },
    [dispatchAnswer, isCorrect]
  );

  useEffect(() => {
    if (isPressed) {
      const timeId = setTimeout(setIsPressed, 700, false);

      return () => {
        clearTimeout(timeId);
      };
    }
  }, [isPressed]);

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (isPressed) {
        return;
      }

      if (e.key === 'ArrowRight') {
        handleClick(true);
        setIsPressed(true);
      }
      if (e.key === 'ArrowLeft') {
        handleClick(false);
        setIsPressed(true);
      }
    };

    document.addEventListener('keydown', keyDown);
    return () => {
      document.removeEventListener('keydown', keyDown);
    };
  }, [handleClick, isPressed]);

  return (
    <BtnsWrapper>
      <StyledBtn variant="outlined" color="error" onClick={() => handleClick(false)}>
        Неверно
      </StyledBtn>

      <StyledBtn variant="outlined" color="success" onClick={() => handleClick(true)}>
        Верно
      </StyledBtn>
    </BtnsWrapper>
  );
};

export default GameBtns;
