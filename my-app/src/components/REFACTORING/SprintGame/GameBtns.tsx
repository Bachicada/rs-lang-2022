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
  const handleClick = useCallback(
    (btnValue: boolean) => {
      const isAnswerCorrect = btnValue === isCorrect;
      isAnswerCorrect ? correctAudio.play() : incorrectAudio.play();

      dispatchAnswer(isAnswerCorrect);
    },
    [dispatchAnswer, isCorrect]
  );

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleClick(true);
      }
      if (e.key === 'ArrowLeft') {
        handleClick(false);
      }
    };

    document.addEventListener('keydown', keyDown);
    return () => {
      document.removeEventListener('keydown', keyDown);
    };
  }, [handleClick]);

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
