import { Dispatch, Reducer, useEffect } from 'react';
import { createContext, FC, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WordItem } from '../../types';
import { APP_ROUTES, GAME_TYPE } from '../../utils/Constants';
import Game from './Game';

export interface GameAnswers {
  item: WordItem;
  answer: boolean;
  failCounter?: number;
  successCounter?: number;
}

export interface AudiocallProps {
  level?: number;
}

export interface AudioWords {
  item: WordItem;
  incorrect: string[];
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
  currentLifeIndex: number;
  correctAnswersCount: number;
  showModal: boolean;
  showResults: boolean;
  isGameReady: boolean;
  isGameFinished: boolean;
  isLoading: boolean;
  seconds: number;
  timerActive: boolean;
}

const initialState: InitialState = {
  level: null,
  questions: [],
  answers: [],
  new: [],
  currentQuestionIndex: 0,
  currentLifeIndex: 5,
  correctAnswersCount: 0,
  showModal: true,
  showResults: false,
  isGameReady: false,
  isGameFinished: false,
  isLoading: false,
  seconds: 12,
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
      };
    }
    case 'SET_RECORD': {
      return {
        ...state,
      };
    }
    case 'ADD_NEW': {
      const newArr = [...state.new, action.payload];
      return {
        ...state,
        new: newArr,
      };
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
      };
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
      };
    }
    case 'INCORRECT_ANSWER': {
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
    case 'SECOND': {
      const seconds = state.seconds - 1;
      return {
        ...initialState,
        seconds,
      };
    }
    case 'OUT_OF_TIME': {
      const currentLifeIndex = state.currentLifeIndex - 1;
      const currentQuestionIndex = state.currentQuestionIndex + 1;
      const isGameFinished =
        currentLifeIndex === 0 || currentQuestionIndex >= state.questions.length ? true : false;
      const seconds = currentLifeIndex === 0 ? 0 : 12;
      return {
        ...state,
        currentLifeIndex,
        isGameFinished,
        seconds,
        currentQuestionIndex,
      };
    }
    case 'RESTART': {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

type IQuizContext = [InitialState, Dispatch<{ type: string; payload?: any }>];
export const AudioContext = createContext<IQuizContext>([initialState, () => null]);

const Sprint: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.addEventListener('beforeunload', () =>
      localStorage.setItem('CurrentLink', location.pathname)
    );
    return () =>
      window.removeEventListener('beforeunload', () =>
        localStorage.setItem('CurrentLink', location.pathname)
      );
  }, [location]);

  useEffect(() => {
    const path = localStorage.getItem('CurrentLink');
    console.log('pac', path);
    const checkPage = () => {
      if (path) {
        navigate(`${path}`);
      } else {
        navigate(`${APP_ROUTES.MAIN}`);
      }
    };
    window.addEventListener('domcontentloaded', checkPage);
    return () => window.removeEventListener('domcontentloaded', checkPage);
  }, []);

  const value = useReducer(reducer, initialState);

  return (
    <AudioContext.Provider value={value}>
      <Game type={GAME_TYPE.AUDIOCALL} />
    </AudioContext.Provider>
  );
};

export default Sprint;
