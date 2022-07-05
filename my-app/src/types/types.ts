import { WORD_STATUS } from '../utils/Constants';

export interface NewUser {
  userId?: string;
  name?: string | null;
  email?: string | null;
  password?: string | null;
}

export interface CurUser {
  message?: string;
  name?: string;
  token?: string;
  refreshToken?: string;
  userId?: string;
}

export interface PartProps {
  part: string | undefined;
}

export interface PageProps extends PartProps {
  page: string | undefined;
}

export interface WordItem {
  userWord: any;
  _id?: string;
  id: string;
  group: number;
  page: string;
  word?: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  isHardWord?: boolean;
  isLearnedWord?: boolean;
  isNewWord?: boolean;
  failCounter: number;
  successCounter: number;
}

export interface UserWordItem {
  userWord: UserWord;
  _id: string;
  group: number;
  page: string;
  word?: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  isHardWord?: boolean;
  isLearnedWord?: boolean;
  isNewWord?: boolean;
  failCounter?: number;
  successCounter?: number;
}

export interface UserWord {
  difficulty: string;
  optional: {
    failCounter: number;
    successCounter: number;
  };
}

export interface IUserWord {
  difficulty: WORD_STATUS;
  id: string;
  optional: {
    failCounter: number;
    group: string;
    page: string;
    successCounter: number;
  };
  wordId: string;
}

export interface WordCardProp {
  word: WordItem;
  onDataChanged: () => void;
}
export interface OptionBtnsProp {
  word: WordItem;
  onDataChanged: () => void;
}
export interface WordStatProp {
  word: WordItem;
}

export interface FormProps {
  hasAccount: boolean;
}
