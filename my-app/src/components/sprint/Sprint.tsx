import { Dispatch, Reducer, useEffect } from 'react';
import { createContext, FC, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { WordItem } from '../../types';
import { getPartOfTextbook } from '../../services/WordService';
import { GAME_TYPE } from '../../utils/Constants';
import Utils from '../../utils/Utils';
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

// export function getPreload(part: string, page: string) {
//   initialState.level = +part;
//   let data: any = [];
//   for (let i = +page; i >= 0; i--) {
//     data.push(i);
//   }
//   console.log(data, part, page);
//   const fetchData = async() => {
//     // try {
//     //   data = data.map(async (page: number) => {
//     //     await getPartOfTextbook(`${page}`, `${part}`);
//     //   });
//     // } catch(err) {
//     //   alert('Oops! Something goes wrong.')
//     // }
//     // const data = await (await Promise.allSettled(quizState.new)).map((item: any) => item.value.optional);
//     data = [await getPartOfTextbook('0', `${part}`), await getPartOfTextbook('2', `${part}`), await getPartOfTextbook('1', `${part}`)];
//     return data;
//   }
//   const a = fetchData();
//   // initialState.questions = Utils.getSprintWords(data);
//   console.log('PRELOAD', a);
//   // return Utils.getSprintWords(data);
//   return a;
// }

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
    case 'PRELOAD': {
      return {
        ...state,
        level: action.payload.level,
        questions: action.payload.randomData,
        isLoading: false,
        isGameReady: true,
        timerActive: true,
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
