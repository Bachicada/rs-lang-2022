import { ICreateUserWord, IUpdateUserWord } from '../types/types';
import { API_URL, ENDPOINTS } from '../utils/Constants';
import { getUserAggrWordById } from './UserAggregatedWordsService';

export const getUserAllWords = async () => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    throw new Error('Need to be logged in!');
  }

  const { userId, token } = JSON.parse(userJSON);

  const response = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error('Something went wrong');
};

export const getUserWordById = async (wordId: string) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  const response = await fetch(
    `${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}/${wordId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  );

  if (response.ok) {
    return response.json();
  }

  return null;
};

export const createUserWord = async ({ wordId, word }: ICreateUserWord) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  const options = {
    method: (await getUserWordById(wordId)) ? 'PUT' : 'POST',
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

  if (rawResponse.ok) {
    return rawResponse.json();
  }

  return null;
};

export const changeUserWordType = async ({ wordId, word }: IUpdateUserWord) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  const options = {
    method: (await getUserWordById(wordId)) ? 'PUT' : 'POST',
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

  if (rawResponse.ok) {
    return rawResponse.json();
  }

  return null;
};

export const deleteUserWord = async (wordId: string) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  const response = await fetch(
    `${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}/${wordId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    }
  );

  if (response.status === 204) {
    return true;
  }

  throw new Error('Deleting error');
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

  const [aggrWord] = await getUserAggrWordById(wordId);
  if (aggrWord.userWord?.difficulty) {
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
  const content = rawResponse.json();

  console.log(options.method === 'POST' ? 'created word is ' : 'updated word is ', content);
  return content;
};
