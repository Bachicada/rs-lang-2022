import { API_URL, ENDPOINTS } from '../utils/Constants';
import { NewUser } from '../types/types';
import Utils from '../utils/Utils';

export async function createUser(user: NewUser) {
  const rawResponse = await fetch(`${API_URL}${ENDPOINTS.USERS}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  switch (rawResponse.status) {
    case 417: {
      throw new Error('Пользователь с такими данными уже существует');
    }
    case 200: {
      return rawResponse;
    }
    default: {
      return rawResponse;
    }
  }
}

export const loginUser = async (user: NewUser) => {
  const rawResponse = await fetch(`${API_URL}${ENDPOINTS.SIGNIN}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  switch (rawResponse.status) {
    case 404: {
      throw new Error('Пользователя с таким адресом нет');
    }
    case 403: {
      throw new Error('Введен неверный пароль');
    }
    case 200: {
      return rawResponse.json();
    }
    default: {
      return rawResponse.json();
    }
  }
};

export const getNewToken = async () => {
  const userId = Utils.getUserId();
  const refreshToken = Utils.getRefreshToken();

  const response = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.TOKENS}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (response.ok) {
    return response;
  }

  throw new Error('Token error!');
};

type GetNewUserToken = {
  userId: string;
  refreshToken: string;
};
export const getNewUserToken = async ({ refreshToken, userId }: GetNewUserToken) => {
  const response = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.TOKENS}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (response.ok) {
    return response.json();
  }

  throw new Error('Token error!');
};
