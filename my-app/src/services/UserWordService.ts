import { StringLiteralLike } from 'typescript';
import { WordItem } from '../types/types';
import { API_URL, ENDPOINTS, WORD_STATUS } from '../utils/Constants';
import Utils from '../utils/Utils';

interface UserWordOptional {
  failCounter: number;
  successCounter: number;
}

interface UserWord {
  difficulty: WORD_STATUS;
  optional: UserWordOptional;
}

interface ICreateUserWord {
  wordId: string;
  word: UserWord;
}

export const getUserWords = async () => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const content = await data.json();
  return content;
};

export const getUserWord = async (wordId: string) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const content = data.status === 200 ? await data.json() : null;
  return content;
};

export const createUserWord = async ({ wordId, word }: ICreateUserWord) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  const options = {
    method: (await getUserWord(wordId)) ? 'PUT' : 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  };

  const rawResponse = await fetch(
    `${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}/${wordId}`,
    options
  );

  const content = await rawResponse.json();

  console.log('created word is ', content);
};

export const deleteUserWord = async (wordId: string) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  if (data.status === 204) console.log('WORD HAS BEEN DELETED SUCCESSFULLY');
  else console.log('DELETING GOES WRONG!');
};

export const getUserAggrWords = async () => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);
  // const smth = '{"$or":[{"userWord.difficulty":"hard"},{"group": 5}]}'
  // const smth = '{$and: [{"userWord.difficulty":"hard"}, { "group": 2 }]}'
  // const smth = '{"$and":[{"userWord.difficulty":"new"},{"wordsPerPage": 3600}]}'
  const smth = '{"userWord.difficulty":"new"}';
  const data = await fetch(
    `${API_URL}${ENDPOINTS.USERS}/${userId}/AggregatedWords?filter=${smth}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  );

  const content = await data.json();
  return content;
};

export const getHardWords = async () => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);
  const smth = '{"userWord.difficulty":"hard"}';
  const data = await fetch(
    `${API_URL}${ENDPOINTS.USERS}/${userId}/aggregatedwords?wordsPerPage=3600&filter=${smth}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  );

  const content = await data.json();
  return content;
};

export const getUserAggrWord = async (wordId: string) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/AggregatedWords/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  const content = await data.json();
  return content;
};

export const updateUserWord = async ({ wordId, word }: ICreateUserWord) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return null;
  }
  const { userId, token } = JSON.parse(userJSON);
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  };

  const aggrWord = await getUserAggrWord(wordId);
  if (aggrWord[0].userWord?.difficulty) {
    options.method = 'PUT';
    const updWord = { ...word };
    updWord.optional.failCounter += aggrWord[0].userWord.optional.failCounter;
    updWord.optional.successCounter += aggrWord[0].userWord.optional.successCounter;
    options.body = JSON.stringify(updWord);
  }

  const rawResponse = await fetch(
    `${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}/${wordId}`,
    options
  );
  const content = await rawResponse.json();

  console.log(options.method === 'POST' ? 'created word is ' : 'updated word is ', content);
  return content;
};

// NEW PASTED

export const createWord = async ({
  userId,
  wordId,
  word,
  wordStatus,
}: {
  userId: string;
  wordId: string;
  word: WordItem;
  wordStatus: string;
}) => {
  const token = Utils.getUserToken();
  console.log(token);
  const bodyReq: BodyInit = JSON.stringify({
    difficulty: `${wordStatus}`,
    optional: {
      group: `${word.group}`,
      page: `${word.page}`,
      failCounter: 0,
      successCounter: 0,
    },
  });
  const rawResponse = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/words/${wordId}`, {
    method: 'POST',
    //withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },

    body: bodyReq,
  });
  return rawResponse;
};

export const deleteWord = async ({ userId, wordId }: { userId: string; wordId: string }) => {
  const token = Utils.getUserToken();
  const rawResponse = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return rawResponse;
};
/*
  export const getHardWords = async (userId: string, token: string) =>{ 
    const hardFilter ='{"$and":[{"userWord.difficulty":"hard"}]}' /*, {"page":${page}
    const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/aggregatedwords?wordsPerPage=3600&filter=${hardFilter}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    return data;
  }
  */

export const getLearnedWords = async (userId: string, token: string) => {
  const hardFilter = '{"$and":[{"userWord.difficulty":"learned"}]}'; /*, {"page":${page}*/
  const data = await fetch(
    `${API_URL}${ENDPOINTS.USERS}/${userId}/aggregatedwords?wordsPerPage=3600&filter=${hardFilter}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  return data;
};

export const getPlayedWords = async (userId: string, token: string) => {
  const hardFilter = '{"$and":[{"userWord.difficulty":"new"}]}'; /*, {"page":${page}*/
  try {
    const data = await fetch(
      `${API_URL}${ENDPOINTS.USERS}/${userId}/aggregatedwords?wordsPerPage=3600&filter=${hardFilter}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserWords = async (userId: string, token: string) => {
  const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  return await data.json();
};
