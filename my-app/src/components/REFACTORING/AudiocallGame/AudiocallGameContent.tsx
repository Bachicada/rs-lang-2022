import { Container } from '@mui/material';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { updateUserWord } from '../../../services/UserWordService';
import { API_URL, GAME_TYPE, WORD_STATUS } from '../../../utils/Constants';
import GameScore from '../SprintGame/GameScore';
// import { GameAnswers } from '../../pages/sprint/Sprint';
// import { AudioWords, AudioContext } from '../../pages/audiocall/Audiocall';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button';
import { useAudiocallContext } from '../../../store/hooks';
import { AudiocallActionTypes } from '../../../types/audiocallTypes';
import { StyledStack } from '../Game/styles';
import GameControls from '../SprintGame/GameControls';
import GameQuestion from './GameQuestion';
import GameBtns from './GameBtns';

const AudiocallGameContent = () => {
  const [{ questions, currentQuestionIndex, correctAnswersCount, currentLifeIndex }, dispatch] =
    useAudiocallContext();

  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  useEffect(() => {
    let cleanupFunction = false;
    if (!cleanupFunction && isAnswered) {
      const updAnswer = async () => {
        const item = questions[currentQuestionIndex].item;
        const [failCounter, successCounter] = [+!isAnswerCorrect, +isAnswerCorrect];
        const content = updateUserWord({
          wordId: `${item.id}`,
          word: {
            difficulty: WORD_STATUS.NEW,
            optional: {
              failCounter,
              successCounter,
            },
          },
        });
        dispatch({ type: AudiocallActionTypes.ADD_NEW, payload: content });
        const answer = {
          item,
          answer: isAnswerCorrect,
          audio: new Audio(`${API_URL}/${item.audio}`),
        };

        dispatch({
          type: isAnswerCorrect
            ? AudiocallActionTypes.CORRECT_ANSWER
            : AudiocallActionTypes.INCORRECT_ANSWER,
          payload: answer,
        });
        setIsAnswered(false);
      };
      updAnswer();
    }
    return () => {
      cleanupFunction = true;
    };
  }, [isAnswered]);

  const obj = questions[currentQuestionIndex];
  const { item } = obj;
  const audio = new Audio(`${API_URL}/${item.audio}`);

  useEffect(() => {
    audio.play();
  }, [currentQuestionIndex]);

  return (
    <>
      <StyledStack direction="column" spacing={2}>
        <GameControls
          audio={audio}
          correctAnswersCount={correctAnswersCount}
          isCorrect={isAnswerCorrect}
          type={GAME_TYPE.AUDIOCALL}
          currentLifeIndex={currentLifeIndex}
        />

        <GameQuestion question={item} />

        <GameBtns
          answers={obj.incorrect}
          correctAnswer={item.wordTranslate}
          setIsAnswered={setIsAnswered}
          setIsAnswerCorrect={setIsAnswerCorrect}
        />
      </StyledStack>
    </>

    // <Container
    //   maxWidth="md"
    //   style={{
    //     border: '1px solid black',
    //     borderRadius: '5px',
    //     display: 'flex',
    //     alignItems: 'center',
    //     flexDirection: 'column',
    //     minHeight: '400px',
    //     justifyContent: 'space-between',
    //   }}
    // >
    //   {
    //   <GameScore
    //     correctAnswersCount={correctAnswersCount}
    //     isCorrect={isAnswerCorrect}
    //     type={GAME_TYPE.AUDIOCALL}
    //     currentLifeIndex={currentLifeIndex}
    //   />
    // }
    // <VolumeUpIcon
    //   style={{ marginTop: '10px', width: '50px', height: '50px' }}
    //   onClick={() => {
    //     audio.play();
    //   }}
    // />
    // <div style={{ textAlign: 'center' }}>
    //   <h2 style={{ color: '#5393E1' }}>{item.word}</h2>
    // </div>
    // <div>
    //   {obj.incorrect.map((word: string, id: number) => {
    //     return (
    //       <Button
    //         variant="outlined"
    //         key={id}
    //         onClick={() => {
    //           if (word === item.wordTranslate) {
    //             setIsAnswerCorrect(true);
    //             setIsAnswered(true);
    //           } else {
    //             setIsAnswerCorrect(false);
    //             setIsAnswered(true);
    //           }
    //         }}
    //       >
    //         {word}
    //       </Button>
    //     );
    //   })}
    // </div>
    // </Container>
  );
};

export default AudiocallGameContent;
