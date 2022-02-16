import { StringLiteralLike } from "typescript";
import { API_URL, ENDPOINTS } from "../utils/Constants";

interface UserWordOptional {
  failCounter: number;
  successCounter: number;
}

interface UserWord {
  difficulty: string;
  optional: UserWordOptional;
}

interface ICreateUserWord {
  wordId: string;
  word: UserWord;
}

export const getUserWords = async() => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  };
  const { userId, token } = JSON.parse(userJSON);

  const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
  });

  const content = await data.json();
  return content;
}

export const getUserWord = async(wordId: string) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  };
  const { userId, token } = JSON.parse(userJSON);

  const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}/${wordId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
  });

  const content = data.status === 200 ? await data.json() : null;
  return content;
}


export const createUserWord = async ({ wordId, word }: ICreateUserWord) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  };
  const { userId, token } = JSON.parse(userJSON);

  const options = {
    method: await getUserWord(wordId) ? 'PUT' : 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(word)
  }

  const rawResponse = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}/${wordId}`, options);

  const content = await rawResponse.json();

  console.log('created word is ', content);
};

export const deleteUserWord = async(wordId: string) => {
  const userJSON = localStorage.getItem('CurrentUser');
  if (!userJSON) {
    return 'no info';
  };
  const { userId, token } = JSON.parse(userJSON);

  const data = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}${ENDPOINTS.WORDS}/${wordId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
  });
  if (data.status === 204) console.log('WORD HAS BEEN DELETED SUCCESSFULLY');
  else console.log('DELETING GOES WRONG!');
}