export const APP_ROUTES = {
    MAIN: '/',
    SIGNIN: '/signIn',
    REGFORM: '/registration',
    TEXTBOOK: '/textbook',
    SPRINT: '/sprint',
    STATISTICS: '/statistics',
    AUDIOCALL: '/audiocall',
    PART1: '/part1',
    PART2: '/part2',
    PART3: '/part3',
    PART4: '/part4',
    PART5: '/part5',
    PART6: '/part6'
};

export const API_URL = 'https://app-rs-lang-2022.herokuapp.com';

export const ENDPOINTS = {
    WORDS: '/words',
    USERS: '/users',
    PAGE:'page=',
    GROUP:'group=',
    SIGNIN: '/signin',
    TOKENS:'/tokens'
};

export enum GAME_TYPE {
  AUDIOCALL,
  SPRINT,
}

export enum WORD_STATUS {
  HARD = 'hard',
  LEARNED = 'learned'
}
export enum WORDS_TYPE {
  NEW = 'new',
  HARD = 'hard',
  LEARNED = 'learned',
}
