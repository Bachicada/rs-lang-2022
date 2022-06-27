import { Reducer } from 'react';
import { InitialState, ReducerAction, SprintActionTypes } from '../../types/sprintTypes';
import { initialState } from '../sprintContext';

const sprintReducer: Reducer<InitialState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case SprintActionTypes.LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case SprintActionTypes.PRELOAD: {
      return {
        ...state,
        level: action.payload.level,
        questions: action.payload.randomData,
        isLoading: false,
        isGameReady: true,
        isTimerActive: true,
      };
    }

    case SprintActionTypes.SET_RECORD: {
      return {
        ...state,
        score: state.score + action.payload,
      };
    }

    case SprintActionTypes.CHANGE_LEVEL: {
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

    case SprintActionTypes.CORRECT_ANSWER: {
      const answers = [...state.answers, action.payload];
      const correctAnswersCount = state.correctAnswersCount + 1;
      const currentQuestionIndex = state.currentQuestionIndex + 1;
      const maxAnswersCount =
        correctAnswersCount > state.maxAnswersCount ? correctAnswersCount : state.maxAnswersCount;
      const isGameFinished = state.questions.length === currentQuestionIndex ? true : false;
      return {
        ...state,
        answers,
        correctAnswersCount,
        currentQuestionIndex,
        isGameFinished,
        maxAnswersCount,
        allCorrectCount: state.allCorrectCount + 1,
      };
    }

    case SprintActionTypes.INCORRECT_ANSWER: {
      const answers = [...state.answers, action.payload];
      const correctAnswersCount = 0;
      const currentQuestionIndex = state.currentQuestionIndex + 1;
      const isGameFinished = state.questions.length === currentQuestionIndex ? true : false;
      return {
        ...state,
        answers,
        correctAnswersCount,
        currentQuestionIndex,
        isGameFinished,
        allIncorrectCount: state.allIncorrectCount + 1,
      };
    }

    case SprintActionTypes.ADD_NEW: {
      const newArr = [...state.newWords, action.payload];
      return {
        ...state,
        new: newArr,
      };
    }

    case SprintActionTypes.SET_SCORE: {
      const answer = [...state.answers];
      state.newWords.map((item, id) => {
        item.then((res: any) => {
          answer[id].failCounter = res.optional.failCounter;
          answer[id].successCounter = res.optional.successCounter;
        });
      });

      return {
        ...state,
        answer,
        isLoading: false,
      };
    }

    case SprintActionTypes.FINISH_GAME: {
      return {
        ...state,
        isGameFinished: true,
      };
    }

    case SprintActionTypes.RESTART: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};

export default sprintReducer;
