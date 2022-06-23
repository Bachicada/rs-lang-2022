import { Container, styled } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { updateUserWord } from '../../services/UserWordService';
import { API_URL, GAME_TYPE, WORD_STATUS } from '../../utils/Constants';
import GameScore from '../game/GameScore';
import { QuizContext } from './Sprint';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button';

// const correctAudio = new Audio(require('../../assets/correct.mp3'));
const correctAudio = new Audio();
// const incorrectAudio = new Audio(require('../../assets/incorrect.mp3'));
const incorrectAudio = new Audio();

const TestDiv = styled('div')`
  height: 15px;
  width: 100%;
  position: absolute;
  top: 0;
  transform: translateY(-120%);
  border-radius: 10px;
  border: 1px solid;
  background: linear-gradient(to right, #faa5a7 0%, #467dfb 50%, white 0%);
`;

const HeartIcon = styled('div')`
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url(https://cssanimation.rocks/images/posts/steps/heart.png) no-repeat;
  background-position: 0 0;
  cursor: pointer;
  animation: fave-heart;

  &:hover {
    background-position: -2800px 0;
    transition: background 1s steps(28);
  }

  @keyframes fave-heart {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -2800px 0;
    }
  }
`;

const SprintGame = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  useEffect(() => {
    if (isAnswered) {
      const updAnswer = async () => {
        isAnswerCorrect ? correctAudio.play() : incorrectAudio.play();

        const item = quizState.questions[quizState.currentQuestionIndex].item;
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
        dispatch({ type: 'ADD_NEW', payload: content });
        const answer = {
          item,
          answer: isAnswerCorrect,
        };

        dispatch({
          type: isAnswerCorrect ? 'CORRECT_ANSWER' : 'INCORRECT_ANSWER',
          payload: answer,
        });
        setIsAnswered(false);
      };

      updAnswer();
    }
  }, [dispatch, isAnswerCorrect, isAnswered, quizState.currentQuestionIndex, quizState.questions]);

  const obj = quizState.questions[quizState.currentQuestionIndex];
  const { item } = obj;
  const audio = new Audio(`${API_URL}/${item.audio}`);

  const correctClicked = () => {
    setIsAnswerCorrect(obj.correct ? true : false);
    setIsAnswered(true);
  };
  const notCorrectClicked = () => {
    setIsAnswerCorrect(obj.correct ? false : true);
    setIsAnswered(true);
  };

  useEffect(() => {
    const keyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'ArrowRight') {
        correctClicked();
      }
      if (ev.key === 'ArrowLeft') {
        notCorrectClicked();
      }
    };
    document.addEventListener('keydown', keyDown);
    return () => {
      document.removeEventListener('keydown', keyDown);
    };
  }, [quizState.currentQuestionIndex]);

  return (
    <Container
      maxWidth="md"
      style={{
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '400px',
        justifyContent: 'space-between',
      }}
    >
      <TestDiv></TestDiv>
      <div>
        <HeartIcon />
        <HeartIcon />
        <HeartIcon />
        <HeartIcon />
      </div>

      <GameScore
        correctAnswersCount={quizState.correctAnswersCount}
        isCorrect={isAnswerCorrect}
        type={GAME_TYPE.SPRINT}
      />
      <VolumeUpIcon
        style={{ marginTop: '10px', width: '50px', height: '50px' }}
        onClick={() => {
          audio.play();
        }}
      />
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: '4em' }}>{item.word}</h2>
        <h2 style={{ fontSize: '4em', marginTop: '-45px' }}>
          {obj.correct ? item.wordTranslate : obj.incorrect}
        </h2>
      </div>
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
            setIsAnswerCorrect(obj.correct ? false : true);
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
            setIsAnswerCorrect(obj.correct ? true : false);
            setIsAnswered(true);
          }}
        >
          Верно
        </Button>
      </div>
    </Container>
  );
};

export default SprintGame;
