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
  currentQuestionIndex: number;
  correctAnswersCount: number;
  // currentAnswer: string;
  // answers: any[];
  showModal: boolean,
  showResults: boolean,
  isGameReady: boolean,
  isGameFinished: boolean,
  seconds: number,
  timerActive: boolean,
}

const initialState: InitialState = {
  // currentAnswer: "",
  // answers: Utils.shuffleAnswers(null),
  level: null,
  questions: [],
  currentQuestionIndex: 0,
  correctAnswersCount: 0,
  showModal: true,
  showResults: false,
  isGameReady: false,
  isGameFinished: false,
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
type ReducerAction = { type: any; payload: any; }
// const reducer: Reducer<InitialState, test> = (state: InitialState, action: { type: any; payload: any; }) => {
const reducer: Reducer<InitialState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LEVEL': {
      const lvl = action.payload;
      const arr = getPartOfTextbook(`${0}`, `${lvl}`);
      console.log(arr);
      return {
        ...state,
        level: lvl,
        questions: [1,2,3],
      }
    }
    default:
      return state;
  }
};

// type IQuizContext = [InitialState[], React.Dispatch<React.SetStateAction<InitialState[]>>];
type IQuizContext = [InitialState, Dispatch<{ type: string; payload: any; }>];

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
