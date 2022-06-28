import { Reducer } from 'react';
import {
  AudiocallActionTypes,
  InitialAudiocallState,
  AudiocallReducerAction,
} from '../../types/audiocallTypes';
import { initialAudiocallState } from '../audiocallContext';

const audiocallReducer: Reducer<InitialAudiocallState, AudiocallReducerAction> = (
  state,
  action
) => {
  switch (action.type) {
    case AudiocallActionTypes.LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case AudiocallActionTypes.SET_RECORD: {
      return {
        ...state,
      };
    }
    case AudiocallActionTypes.ADD_NEW: {
      const newArr = [...state.newWords, action.payload];
      return {
        ...state,
        newWords: newArr,
      };
    }
    case AudiocallActionTypes.CHANGE_LEVEL: {
      const { level, result } = action.payload;
      return {
        ...state,
        level: level,
        questions: result,
        isLoading: false,
        isGameReady: true,
        isTimerActive: true,
      };
    }
    case AudiocallActionTypes.CORRECT_ANSWER: {
      const answers = [...state.answers, action.payload];
      const correctAnswersCount = state.correctAnswersCount + 1;
      const currentQuestionIndex = state.currentQuestionIndex + 1;
      const isGameFinished = state.questions.length === currentQuestionIndex ? true : false;
      return {
        ...state,
        answers,
        correctAnswersCount,
        currentQuestionIndex,
        isGameFinished,
      };
    }
    case AudiocallActionTypes.INCORRECT_ANSWER: {
      const answers = [...state.answers, action.payload];
      const correctAnswersCount = 0;
      const currentQuestionIndex = state.currentQuestionIndex + 1;
      const currentLifeIndex = state.currentLifeIndex - 1;
      const isGameFinished =
        state.questions.length === currentQuestionIndex || currentLifeIndex === 0 ? true : false;
      return {
        ...state,
        answers,
        correctAnswersCount,
        currentQuestionIndex,
        isGameFinished,
        currentLifeIndex,
      };
    }
    case AudiocallActionTypes.SECOND: {
      const secondsPerQuestion = state.secondsPerQuestion - 1;
      return {
        ...initialAudiocallState,
        secondsPerQuestion,
      };
    }
    case AudiocallActionTypes.OUT_OF_TIME: {
      const currentLifeIndex = state.currentLifeIndex - 1;
      const currentQuestionIndex = state.currentQuestionIndex + 1;
      const isGameFinished =
        currentLifeIndex === 0 || currentQuestionIndex >= state.questions.length ? true : false;
      const secondsPerQuestion = currentLifeIndex === 0 ? 0 : 12;
      return {
        ...state,
        currentLifeIndex,
        isGameFinished,
        secondsPerQuestion,
        currentQuestionIndex,
      };
    }
    case AudiocallActionTypes.RESTART: {
      return {
        ...initialAudiocallState,
      };
    }
    default:
      return state;
  }
};

export default audiocallReducer;
