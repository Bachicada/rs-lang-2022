import { getHardWords } from '../services/UserAggregatedWordsService';
import { getPartOfTextbook } from '../services/WordService';
import { WordItem } from '../types/types';

const Utils = {
  params: { part: null, page: null },

  setParams: (arr: any) => {
    Utils.params.part = arr.part;
    Utils.params.page = arr.page;
  },

  random: (min: number, max: number) => {
    return min + Math.floor(Math.random() * (max - min + 1));
  },

  getRandomWords: (arr: WordItem[][]) => {
    const piece = [...arr].flat();

    const result = piece.map((item) => {
      //Determines whether the answer will be the correct translation or not
      const correct = Utils.random(0, 1) === 1;

      //If need be - random incorrect translate
      let incorrect = piece[Utils.random(0, piece.length - 1)].wordTranslate;
      while (incorrect === item.wordTranslate) {
        incorrect = piece[Utils.random(0, piece.length - 1)].wordTranslate;
      }

      return {
        item,
        correct,
        incorrect,
      };
    });

    return result;
  },

  getAudioWords: (arr: WordItem[][]) => {
    const piece = [...arr].flat();

    const result = piece.map((item) => {
      // 3 incorrect + 1 correct word in arr
      const incorrect: string[] = new Array(4).fill(null);

      // add 4 incorrect words
      incorrect.forEach((item, idx, arr) => {
        const rand = () => Utils.random(0, piece.length - 1);
        let randomTranslate = piece[rand()].wordTranslate;

        while (arr.includes(randomTranslate)) {
          randomTranslate = piece[rand()].wordTranslate;
        }

        arr[idx] = randomTranslate;
      });

      // change 1 random incorrect word to correct translate
      const correctId = Utils.random(0, 3);
      incorrect[correctId] = item.wordTranslate;

      return {
        item,
        incorrect,
      };
    });

    return result;
  },

  shuffleAnswers: <T>(question: T[]): T[] => {
    if (!question) {
      return [];
    }
    const unshuffledAnswers = [...question];
    return unshuffledAnswers
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  },

  getUserToken: () => {
    const LS = localStorage.getItem('CurrentUser' || '{}');

    if (!LS) {
      return;
    }

    return JSON.parse(LS).token;
  },
  getRefreshToken: () => {
    const LS = localStorage.getItem('CurrentUser' || '{}');

    if (!LS) {
      return;
    }

    return JSON.parse(LS).refreshToken;
  },

  getUserId: () => {
    const LS = localStorage.getItem('CurrentUser' || '{}');

    if (!LS) {
      return;
    }

    return JSON.parse(LS).userId;
  },
};

export default Utils;
