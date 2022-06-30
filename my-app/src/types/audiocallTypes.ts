import { Dispatch } from 'react';
import { WordItem } from './types';

export interface GameAnswers {
  item: WordItem;
  answer: boolean;
  audio: HTMLAudioElement;
  failCounter?: number;
  successCounter?: number;
}

export interface AudioWords {
  item: WordItem;
  incorrect: string[];
}

export interface Questions {
  item: WordItem;
  incorrect: string[];
}

export interface InitialAudiocallState {
  questions: Questions[];
  answers: GameAnswers[];
  newWords: Promise<WordItem>[];

  score: number;
  level: number | null;
  currentQuestionIndex: number;
  currentLifeIndex: number;
  correctAnswersCount: number;
  secondsPerQuestion: number;

  isGameReady: boolean;
  isGameFinished: boolean;
  isLoading: boolean;
  isTimerActive: boolean;
}

export interface AudiocallReducerAction {
  type: AudiocallActionTypes;
  payload?: any;
}

export type IAudiocallContext = [InitialAudiocallState, Dispatch<AudiocallReducerAction>];

export enum AudiocallActionTypes {
  LOADING = 'LOADING',
  SET_RECORD = 'SET_RECORD',
  CHANGE_LEVEL = 'CHANGE_LEVEL',
  CORRECT_ANSWER = 'CORRECT_ANSWER',
  INCORRECT_ANSWER = 'INCORRECT_ANSWER',
  ADD_NEW = 'ADD_NEW',
  SECOND = 'SECOND',
  TIME_TICK = 'TIME_TICK',
  OUT_OF_TIME = 'OUT_OF_TIME',
  RESTART = 'RESTART',
}
