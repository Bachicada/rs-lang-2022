import { Dispatch } from 'react';
import { WordItem } from './types';

export interface GameAnswers {
  item: WordItem;
  answer: boolean;
  failCounter?: number;
  successCounter?: number;
}

export interface IWords {
  item: WordItem;
  correct: boolean;
  incorrect: string;
}

export type Question = {
  item: WordItem;
  correct: boolean;
  incorrect: string;
};

export interface InitialState {
  questions: Question[];
  answers: GameAnswers[];
  newWords: Promise<WordItem>[];

  level: number | null;
  currentQuestionIndex: number;
  correctAnswersCount: number;
  maxAnswersCount: number;
  score: number;
  allCorrectCount: number;
  allIncorrectCount: number;
  seconds: number;

  isGameReady: boolean;
  isGameFinished: boolean;
  isLoading: boolean;
  isTimerActive: boolean;
}

export interface ReducerAction {
  type: SprintActionTypes;
  payload?: any;
}

export type ISprintContext = [InitialState, Dispatch<ReducerAction>];

export enum SprintActionTypes {
  LOADING = 'LOADING',
  PRELOAD = 'PRELOAD',
  SET_RECORD = 'SET_RECORD',
  CHANGE_LEVEL = 'CHANGE_LEVEL',
  CORRECT_ANSWER = 'CORRECT_ANSWER',
  INCORRECT_ANSWER = 'INCORRECT_ANSWER',
  ADD_NEW = 'ADD_NEW',
  SET_SCORE = 'SET_SCORE',
  FINISH_GAME = 'FINISH_GAME',
  RESTART = 'RESTART',
}
