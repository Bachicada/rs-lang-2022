import { createContext } from 'react';
import { InitialSprintState, ISprintContext } from '../types/sprintTypes';

export const initialSprintState: InitialSprintState = {
  questions: [],
  answers: [],
  newWords: [],

  level: null,
  currentQuestionIndex: 0,
  correctAnswersCount: 0,
  maxAnswersCount: 0,
  score: 0,
  allIncorrectCount: 0,
  allCorrectCount: 0,
  seconds: 60,

  isGameReady: false,
  isGameFinished: false,
  isLoading: false,
  isTimerActive: false,
};

const SprintContext = createContext<ISprintContext>([initialSprintState, () => null]);

export default SprintContext;
