import { API_URL, ENDPOINTS } from '../utils/Constants';

export const getHardWords = async (userId: string, token: string) => {
  const hardFilter = '{"$and":[{"userWord.difficulty":"hard"}]}'; /*, {"page":${page}*/
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
  } catch (e) {
    console.log('error', e);
  }
};
