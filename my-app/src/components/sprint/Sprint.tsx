import React, { Dispatch } from 'react';
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

const reducer = (state: InitialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    default:
      return state;
  }
};

// type IQuizContext = [InitialState[], React.Dispatch<React.SetStateAction<InitialState[]>>];

export const QuizContext = createContext<Dispatch<{ type: any; payload: any; }>>(() => null);

const Sprint: FC<SprintProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <QuizContext.Provider value ={dispatch}>
      <Game type={GAME_TYPE.SPRINT} state={state}/>
    </QuizContext.Provider>
  );
}

export default Sprint;
