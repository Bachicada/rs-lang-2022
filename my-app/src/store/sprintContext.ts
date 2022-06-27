import { createContext } from 'react';
import { InitialState, ISprintContext } from '../types/sprintTypes';

export const initialState: InitialState = {
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
  seconds: 1000,

  isGameReady: false,
  isGameFinished: false,
  isLoading: false,
  isTimerActive: false,
};

const SprintContext = createContext<ISprintContext>([initialState, () => null]);

export default SprintContext;
