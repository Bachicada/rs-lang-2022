import { API_URL, ENDPOINTS } from '../utils/Constants';

export async function getWords() {
  const response = await fetch(`${API_URL}${ENDPOINTS.WORDS}`, {
    method: 'GET',
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error('Something goes wrong!');
}

export const getPartOfTextbook = async (
  pageNumber: string | undefined,
  partNumber: string | undefined
) => {
  const response = await fetch(
    `${API_URL}${ENDPOINTS.WORDS}?${ENDPOINTS.PAGE}${pageNumber}&${ENDPOINTS.GROUP}${partNumber}`,
    {
      method: 'GET',
    }
  );

  if (response.ok) {
    return response.json();
  }

  throw new Error('Something goes wrong!');
};
