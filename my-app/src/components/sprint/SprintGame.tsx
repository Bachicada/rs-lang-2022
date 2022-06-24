import { Container, Stack, styled } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { updateUserWord } from '../../services/UserWordService';
import { API_URL, GAME_TYPE, WORD_STATUS } from '../../utils/Constants';
import GameScore from '../game/GameScore';
import { QuizContext } from './Sprint';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Button from '@mui/material/Button';
import Timer from '../game/Timer';
import ProgressBar from '../REFACTORING/Game/ProgressBar';
import GameControls from '../REFACTORING/Game/GameControls';
import GameQuestion from '../REFACTORING/Game/GameQuestion';
import GameBtns from '../REFACTORING/Game/GameBtns';

// const correctAudio = new Audio(require('../../assets/correct.mp3'));
const correctAudio = new Audio();
// const incorrectAudio = new Audio(require('../../assets/incorrect.mp3'));
const incorrectAudio = new Audio();

// const TestDiv = styled('div')`
//   height: 15px;
//   width: 100%;
//   position: absolute;
//   top: 0;
//   transform: translateY(-120%);
//   border-radius: 10px;
//   border: 1px solid;
//   background: linear-gradient(to right, #faa5a7 0%, #467dfb 50%, white 0%);
// `;

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

  const question = quizState.questions[quizState.currentQuestionIndex];
  const { item } = question;
  const audio = new Audio(`${API_URL}/${item.audio}`);

  const correctClicked = () => {
    setIsAnswerCorrect(question.correct ? true : false);
    setIsAnswered(true);
  };
  const notCorrectClicked = () => {
    setIsAnswerCorrect(question.correct ? false : true);
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
    <>
      {/* <ProgressBar
        correctAnswersCount={quizState.correctAnswersCount}
        isCorrect={isAnswerCorrect}
      /> */}

      <Stack
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
        }}
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
      >
        <GameControls
          audio={audio}
          correctAnswersCount={quizState.correctAnswersCount}
          isCorrect={isAnswerCorrect}
          type={GAME_TYPE.SPRINT}
        />
        <GameQuestion question={question} item={item} />
        <GameBtns
          question={question}
          setIsAnswered={setIsAnswered}
          setIsAnswerCorrect={setIsAnswerCorrect}
        />
        {/* {stackContent.map(({ img, title, subtitle, link }, idx) => (
          <StyledItem key={idx} onClick={() => navigate(link)}>
            <img src={img} alt="controller" />

            <Typography variant="h6">{title}</Typography>

            <Typography variant="body1">{subtitle}</Typography>
          </StyledItem>
        ))} */}

        {/* <Stack
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
          }}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
        >
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
        </Stack> */}

        {/* <Timer time={seconds} max={60} /> */}
        {/* <div style={{ textAlign: 'center' }}>
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
        {/* <Button
            sx={{ color: '#a10d0d !important' }}
            variant="outlined"
            color="error"
            style={{ width: '200px', height: '70px' }}
            onClick={() => { */}
        {/* //       setIsAnswerCorrect(obj.correct ? false : true);
        //       setIsAnswered(true);
        //     }}
        //   >
        //     Неверно
        //   </Button>
        //   <Button
        //     sx={{ color: '#02722b !important' }}
        //     variant="outlined"
        //     color="success"
        //     style={{ width: '200px', height: '70px' }}
        //     onClick={() => {
        //       setIsAnswerCorrect(obj.correct ? true : false);
        //       setIsAnswered(true);
        //     }}
        //   >
        //     Верно
        //   </Button>
        // </div> */}
      </Stack>
    </>
  );
};

export default SprintGame;
