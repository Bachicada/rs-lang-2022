import { API_URL, ENDPOINTS, WORD_STATUS } from '../utils/Constants';

export const getNewWords = async () => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }

  const { userId, token } = JSON.parse(userJSON);
  const filter = '{"userWord.difficulty":"new"}';

  const response = await fetch(
    `${API_URL}${ENDPOINTS.USERS}/${userId}/AggregatedWords?filter=${filter}`,
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

  throw new Error('Something wrong with new words getting');
};

export const getAggregatedWordsByType = async (type: WORD_STATUS) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    throw new Error('User must be logged in!');
  }

  const { userId, token } = JSON.parse(userJSON);
  const filter = `{"userWord.difficulty":"${type}"}`;

  const response = await fetch(
    `${API_URL}${ENDPOINTS.USERS}/${userId}/AggregatedWords?filter=${filter}`,
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

  throw new Error('Something wrong with aggregated words getting');
};

export const getHardWords = async () => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);
  const filter = '{"userWord.difficulty":"hard"}';

  const response = await fetch(
    `${API_URL}${ENDPOINTS.USERS}/${userId}/aggregatedwords?wordsPerPage=3600&filter=${filter}`,
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

  throw new Error('Something went wrong with hard words');
};

export const getUserAggrWordById = async (wordId: string) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);

  const response = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/AggregatedWords/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error('Something went wrong with aggregated word by id');
};

export const getAllUserAggrWords = async () => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  }
  const { userId, token } = JSON.parse(userJSON);
  const filter = `{"$or":[{"userWord.difficulty":"learned"}, {"userWord.difficulty":"new"}, {"userWord.difficulty":"hard"}]}`;

  const response = await fetch(
    `${API_URL}${ENDPOINTS.USERS}/${userId}/AggregatedWords?filter=${filter}`,
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

  throw new Error('Something went wrong with aggregated words');
};
