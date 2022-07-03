import { getHardWords } from '../services/UserWordService';
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

  getSprintWords: (arr: WordItem[]) => {
    return arr.map((item) => {
      return {
        item,
        //Determines whether the answer will be the correct translation or not
        correct: Utils.random(0, 1) === 1 ? true : false,
        //If need be - random incorrect translate
        incorrect: arr[Utils.random(0, arr.length - 1)].wordTranslate,
      };
    });
  },

  getRandomWords: (arr: WordItem[][]) => {
    const piece = [...arr].flat();

    const result = piece.map((item) => {
      return {
        item: item,
        //Determines whether the answer will be the correct translation or not
        correct: Utils.random(0, 1) === 1 ? true : false,
        //If need be - random incorrect translate
        incorrect: piece[Utils.random(0, 29)].wordTranslate,
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

  getHardQuestions: async () => {
    const prom = await getHardWords();
    const data = prom[0].paginatedResults;
    const formatData = Utils.getSprintWords(data.flat());
    const randomData = Utils.shuffleAnswers(formatData);

    randomData.forEach((item, idx) => {
      randomData[idx].item.id = randomData[idx].item._id || '';
    });
    return randomData;
  },

  getPreparedQuestions: async (page: number, part: number) => {
    const idArr: any[] = [];
    for (let i = page; i >= 0; i--) {
      idArr.push(i);
    }

    const prom = idArr.map((page) => getPartOfTextbook(`${page}`, `${part}`));
    const data = (await Promise.allSettled(prom)).map((item: any) => item.value);
    const formatData = Utils.getSprintWords(data.flat());
    const randomData = Utils.shuffleAnswers(formatData);
    return randomData;
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
