import { API_URL, ENDPOINTS } from '../utils/Constants';
import { NewUser } from '../types';

export async function createUser(user: NewUser) {
  const data = await fetch(`${API_URL}${ENDPOINTS.USERS}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 417) {
        throw new Error('Пользователь с такими данными уже существует');
      } else if (response.status === 200) {
        return response;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
}

export const loginUser = async (user: NewUser) => {
  const rawResponse = await fetch(`${API_URL}${ENDPOINTS.SIGNIN}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 404) {
        throw new Error('Пользователя с таким адресом нет');
      } else if (response.status === 403) {
        throw new Error('Введен неверный пароль');
      } else if (response.status === 200) {
        return response;
      }
    })
    .catch((error) => console.log(error));

  return rawResponse;
};
