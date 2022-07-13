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
      const incorrect: number[] = [];
      for (let i = 0; i < 4; i++) {
        if (i === 0) incorrect.push(Utils.random(0, piece.length - 1));
        else {
          let rand = Utils.random(0, piece.length - 1);
          while (rand === incorrect[i - 1]) {
            rand = Utils.random(0, piece.length - 1);
          }
          incorrect.push(rand);
        }
      }
      const rightId = Utils.random(0, 3);
      return {
        item: item,
        //4 incorrect words
        incorrect: incorrect.map((num, id) =>
          id === rightId ? item.wordTranslate : piece[num].wordTranslate
        ),
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
