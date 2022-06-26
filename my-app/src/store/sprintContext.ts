import { createContext } from 'react';
import { InitialState, SprintContext } from '../types/sprintTypes';

export const initialState: InitialState = {
  level: null,
  questions: [],
  answers: [],
  new: [],
  currentQuestionIndex: 0,
  correctAnswersCount: 0,
  maxAnswersCount: 0,
  score: 0,
  allIncorrectCount: 0,
  allCorrectCount: 0,
  showModal: true,
  showResults: false,
  isGameReady: false,
  isGameFinished: false,
  isLoading: false,
  seconds: 1000,
  timerActive: false,
};

const SprintContext = createContext<SprintContext>([initialState, () => null]);

export default SprintContext;
