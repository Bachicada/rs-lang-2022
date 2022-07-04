import { API_URL, ENDPOINTS } from '../utils/Constants';

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
