import React, { Dispatch, Reducer } from 'react';
import { createContext, FC, useReducer } from 'react';
import { getPartOfTextbook } from '../../services/WordService';
import { WordItem } from '../../types';
import { GAME_TYPE } from '../../utils/Constants';
import Utils from '../../utils/Utils';
import Game from '../game/Game';

export interface SprintProps {
  level?: number;
}

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
  currentQuestionIndex: number;
  correctAnswersCount: number;
  // currentAnswer: string;
  // answers: any[];
  showModal: boolean,
  showResults: boolean,
  isGameReady: boolean,
  isGameFinished: boolean,
  isLoading: boolean,
  seconds: number,
  timerActive: boolean,
}

const initialState: InitialState = {
  // currentAnswer: "",
  // answers: Utils.shuffleAnswers(null),
  level: null,
  questions: [],
  answers: [],
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
// const [level, setLevel] = useState(props.level || null);
// const [words, setWords] = React.useState<AudioWords[] | IWords[]>([]);
// const [wordsId, setWordsId] = React.useState(0);

// const [modalOpen, setModalOpen] = useState(props ? true : false);
// const [isGameReady, setIsGameReady] = React.useState(false);
// const [ isGameFinished, setIsGameFinished ] = React.useState(false);

// const [ seconds, setSeconds ] = React.useState(60);
// const [ timerActive, setTimerActive ] = React.useState(false);
// type ReducerAction = { type: any; payload?: any; }
interface ReducerAction {
  type: any;
  payload?: any;
}
// const reducer: Reducer<InitialState, test> = (state: InitialState, action: { type: any; payload: any; }) => {
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
      return {
        ...state,
        answers,
        correctAnswersCount,
        currentQuestionIndex,
      }
    }
    case 'INCORRECT_ANSWER': {
      const answers = [...state.answers, action.payload];
      const correctAnswersCount = 0;
      const currentQuestionIndex = state.currentQuestionIndex + 1;
      return {
        ...state,
        answers,
        correctAnswersCount,
        currentQuestionIndex,
      }
    }
    default:
      return state;
  }
};

// type IQuizContext = [InitialState[], React.Dispatch<React.SetStateAction<InitialState[]>>];
type IQuizContext = [InitialState, Dispatch<{ type: string; payload?: any; }>];

// export const QuizContext = createContext<Dispatch<{ type: any; payload: any; }>>(() => null);
export const QuizContext = createContext<IQuizContext>([initialState, () => null]);

const Sprint: FC<SprintProps> = (props) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const value = useReducer(reducer, initialState);
  return (
    <QuizContext.Provider value ={value}>
      <Game type={GAME_TYPE.SPRINT}/>
    </QuizContext.Provider>
  );
}

export default Sprint;
