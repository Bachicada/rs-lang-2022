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
  difficulty: WORD_STATUS;
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

export type CardColors = {
  [key in WORD_STATUS]?: string;
};

export type CustomError = {
  message: string;
};

export interface UpdatedUserWord {
  difficulty: WORD_STATUS;
  optional?: {
    failCounter: number;
    successCounter: number;
  };
}

export interface ICreateUserWord {
  wordId: string;
  word: UserWord;
}

export interface IUpdateUserWord {
  wordId: string;
  word: UpdatedUserWord;
}

export interface UserStatistics {
  learnedWords: number;
  optional: {
    sprint: string;
    audiocall: string;
  };
}
