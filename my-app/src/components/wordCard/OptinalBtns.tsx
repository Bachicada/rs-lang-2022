import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import {
  createWord,
  deleteWord,
  getNewToken,
  getUserId,
  getUserToken,
} from '../../services/WordService';
import { CurUser, OptionBtnsProp, WordItem } from '../../types';
import { API_URL, APP_ROUTES, ENDPOINTS, WORD_STATUS } from '../../utils/Constants';
import styles from './WordCard.module.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AddSnackBar from './AddSnackBar';

export default function OptionalBtns({ word, onDataChanged }: OptionBtnsProp) {
  const userContext = useContext<{
    user: CurUser;
    dispatchUserEvent: (actionType: string, payload: CurUser) => void;
  }>(UserContext);

  const navigate = useNavigate();

  const checkSignIn = () => {
    localStorage.clear();
    userContext.dispatchUserEvent('CLEAR_USER', {});
    navigate(`${APP_ROUTES.SIGNIN}`);
  };

  const [expireStatus, setExpireStatus] = useState(false);

  const userId = getUserId();
  const wordId = word.id || (word._id as string);
  const token = getUserToken();

  const bodyReqHard: BodyInit = JSON.stringify({
    difficulty: `${WORD_STATUS.HARD}`,
    optional: {
      group: `${word.group}`,
      page: `${word.page}`,
      failCounter: 0,
      successCounter: 0,
    },
  });

  const bodyReqLearned: BodyInit = JSON.stringify({
    difficulty: `${WORD_STATUS.LEARNED}`,
    optional: {
      group: `${word.group}`,
      page: `${word.page}`,
      failCounter: 0,
      successCounter: 0,
    },
  });

  const setHardWord = async () => {
    const wordStatus = WORD_STATUS.HARD;

    if (!word.isHardWord) {
      console.log('checkedHard');
      await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}/words/${wordId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: bodyReqHard,
      }).then(async (response) => {
        console.log('первый ответ', response);
        if (response.status === 417) {
          throw new Error('это слово уже в списке сложных');
        } else if (response.status === 401) {
          const newTokenRes = await getNewToken();

          console.log('второй ответ', newTokenRes);

          const LS = localStorage.getItem('CurrentUser' || '{}');

          if (LS && newTokenRes.status !== 401) {
            const newToken = await newTokenRes.json();
            console.log('this new token', newToken);

            const newDataUser: CurUser = {};
            newDataUser.message = JSON.parse(LS).message;
            newDataUser.userId = JSON.parse(LS).userId;
            newDataUser.name = JSON.parse(LS).name;
            newDataUser.token = newToken.token;
            newDataUser.refreshToken = newToken.refreshToken;
            localStorage.setItem('CurrentUser', JSON.stringify(newDataUser));
            userContext.dispatchUserEvent('UPDATE_USER', newDataUser);
          } else if (LS && newTokenRes.status === 401) {
            console.log('все истекло', newTokenRes);
            setExpireStatus(true);
            setTimeout(checkSignIn, 1500);
          }
          const newWordSet = await createWord({ userId, wordId, word, wordStatus });
          return newWordSet;
        }
      });
    } else {
      await deleteWord({ userId, wordId });
    }
  };

  const setLearnedWord = async () => {
    const userId = getUserId();
    const wordId = word.id || (word._id as string);
    const wordStatus = WORD_STATUS.LEARNED;

    if (word.isHardWord) {
      console.log('checkedLearned');
      const deleteHardSet = await deleteWord({ userId, wordId });
      console.log('удалено из сложных', deleteHardSet);

      const newWordSet = await createWord({ userId, wordId, word, wordStatus });
      console.log('добавлено в изученные', await newWordSet.json());
    } else if (word.isLearnedWord) {
      await deleteWord({ userId, wordId });
    } else {
      await createWord({ userId, wordId, word, wordStatus });
    }
  };

  const onHardBtnClick = async () => {
    try {
      await setHardWord();
      onDataChanged();
    } catch (e) {
      console.error(e);
    }
  };

  const onLearnedBtnClick = async () => {
    try {
      await setLearnedWord();
      onDataChanged();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className={styles.btnsCont}>
      {expireStatus ? <div> нужно зайти опять </div> : ''}
      <button
        className={[word.isHardWord ? styles.hardBtnActive : '', styles.wordBtn].join(' ')}
        onClick={() => {
          onHardBtnClick();
        }}
      >
        Сложное
      </button>
      <button
        className={[word.isLearnedWord ? styles.learnedBtnActive : '', styles.wordBtn].join(' ')}
        onClick={() => {
          onLearnedBtnClick();
        }}
      >
        Изученное
      </button>
    </div>
  );
}
