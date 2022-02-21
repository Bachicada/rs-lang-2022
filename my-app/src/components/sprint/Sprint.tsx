import { Dispatch, Reducer, useEffect } from 'react';
import { createContext, FC, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WordItem } from '../../types';
import { APP_ROUTES, GAME_TYPE } from '../../utils/Constants';
import Game from '../game/Game';

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

export interface InitialState {
  level: number | null;
  questions: any[];
  answers: any[];
  new: any[];
  currentQuestionIndex: number;
  correctAnswersCount: number;
  showModal: boolean,
  showResults: boolean,
  isGameReady: boolean,
  isGameFinished: boolean,
  isLoading: boolean,
  seconds: number,
  timerActive: boolean,
}

const initialState: InitialState = {
  level: null,
  questions: [],
  answers: [],
  new: [],
  currentQuestionIndex: 0,
  correctAnswersCount: 0,
  showModal: true,
  showResults: false,
  isGameReady: false,
  isGameFinished: false,
  isLoading: false,
  seconds: 60,
  timerActive: false,
};

interface ReducerAction {
  type: any;
  payload?: any;
}

const reducer: Reducer<InitialState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case 'LOADING': {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'CHANGE_LEVEL': {
      const { level, result } = action.payload;
      return {
        ...state,
        level: level,
        questions: result,
        isLoading: false,
        isGameReady: true,
        timerActive: true,
      }
    }
    case 'CORRECT_ANSWER': {
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
      }
    }
    case 'INCORRECT_ANSWER': {
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
      }
    }
    case 'ADD_NEW': {
      const newArr = [...state.new, action.payload];
      return {
        ...state,
        new: newArr,
      }
    }
    case 'SET_SCORE': {
      const answer = [...state.answers];
      state.new.map((item, id) => {
        item.then((res: any) => {
          answer[id].failCounter = res.optional.failCounter;
          answer[id].successCounter = res.optional.successCounter;
        })
      })
      return {
        ...state,
        answer,
        isLoading: false,
      }
    }
    case 'FINISH_GAME': {
      return {
        ...state,
        isGameFinished: true,
      }
    }
    case 'RESTART': {
      return {
        ...initialState,
        isGameFinished: false,
      }
    }
    default:
      return state;
  }
};

type IQuizContext = [InitialState, Dispatch<{ type: string; payload?: any; }>];
export const QuizContext = createContext<IQuizContext>([initialState, () => null]);

const Sprint: FC = () => {
  const value = useReducer(reducer, initialState);
  return (
    <QuizContext.Provider value ={value}>
      <Game type={GAME_TYPE.SPRINT}/>
    </QuizContext.Provider>
  );
}

export default Sprint;
