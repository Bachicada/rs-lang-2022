import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { CurUser, PageProps, WordItem } from '../../types/types';
import styles from './textbook.module.css';
import // getHardWords,
// getLearnedWords,
// getNewToken,
// getPartOfTextbook,
// getPlayedWords,
// getUserId,
// getUserToken,
'../../services/WordService';
import WordCard from '../wordCard/WordCard';
import { LoadingIcon } from '../shared/LoadingIcon';
// import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES, WORD_STATUS } from '../../utils/Constants';
import ModalExpire from '../shared/ModalExpire';
import Utils from '../../utils/Utils';
import { getNewToken } from '../../services/UserService';
import { getHardWords } from '../../services/old';
import { getLearnedWords, getPlayedWords } from '../../services/UserWordService';
import { getPartOfTextbook } from '../../services/WordService';
import { useUserContext } from '../../store/hooks';
import { useGetTextbookWords } from '../../hooks/useGetTextbookWords';
import Loading from '../shared/Loading';
import { useGetUserAggregatedWords } from '../../hooks/useGetUserAggregatedWords';
import { useGetUserWords } from '../../hooks/useGetUserWords';
import { Grid, styled } from '@mui/material';

export default function WordsContainer(props: PageProps) {
  // const userId = Utils.getUserId();
  // const token = Utils.getUserToken();

  const page = +(props.page || 0);
  const group = +(props.part || 0);
  const { response, error, isLoading } = useGetTextbookWords({ page, group });
  const {
    response: userWordsResponse,
    error: userWordsError,
    isLoading: isLoadingUserWords,
  } = useGetUserWords();

  // const {
  //   response: aggregatedResponse,
  //   error: aggregatedError,
  //   isLoading: isAggregatedLoading,
  // } = useGetUserAggregatedWords();

  // const userContext = useContext<{
  //   user: CurUser;
  //   dispatchUserEvent: (actionType: string, payload: CurUser) => void;
  // }>(UserContext);
  // const [userContext, dispatch] = useUserContext();

  // const [expireStatus, setExpireStatus] = useState(false);

  // const navigate = useNavigate();

  // const checkSignIn = () => {
  //   localStorage.clear();
  //   // userContext.dispatchUserEvent('CLEAR_USER', {});
  //   dispatch({ type: 'CLEAR_USER', payload: {} });
  //   navigate(`${APP_ROUTES.SIGNIN}`);
  // };

  // const [hardWords, setHardWords] = useState<WordItem[]>([]);
  // const [learnedWords, setLearnedWords] = useState<WordItem[]>([]);
  // const [allWords, setAllWords] = useState<WordItem[]>([]);
  // const [playedWords, setPlayedWords] = useState<WordItem[]>([]);
  // const [finalWords, setFinalWords] = useState<WordItem[]>([]);

  // const fetchHardWords = async () => {
  //   getHardWords(userId, token).then(async (response) => {
  //     if (response)
  //       if (response.status === 200) {
  //         const data = await response.json();
  //         const hardWords = data[0].paginatedResults;

  //         setHardWords(hardWords);
  //         setLoadingState(false);
  //       } else if (response.status === 401) {
  //         const newTokenRes = await getNewToken();

  //         const LS = localStorage.getItem('CurrentUser' || '{}');

  //         if (LS && newTokenRes.status !== 401) {
  //           const newToken = await newTokenRes.json();

  //           const newDataUser: CurUser = {};
  //           newDataUser.message = JSON.parse(LS).message;
  //           newDataUser.userId = JSON.parse(LS).userId;
  //           newDataUser.name = JSON.parse(LS).name;
  //           newDataUser.token = newToken.token;
  //           newDataUser.refreshToken = newToken.refreshToken;
  //           localStorage.setItem('CurrentUser', JSON.stringify(newDataUser));
  //           // userContext.dispatchUserEvent('UPDATE_USER', newDataUser);
  //           dispatch({ type: 'UPDATE_USER', payload: newDataUser });
  //         } else if (LS && newTokenRes.status === 401) {
  //           setExpireStatus(true);
  //           setTimeout(checkSignIn, 1000);
  //         }
  //       }
  //   });
  // };

  // const fetchLearnedWords = async () => {
  //   getLearnedWords(userId, token).then(async (response) => {
  //     if (response.status === 200) {
  //       const data = await response.json();
  //       const learnedWords = data[0].paginatedResults;
  //       setLearnedWords(learnedWords);
  //       setLoadingState(false);
  //     } else if (response.status === 401) {
  //       const newTokenRes = await getNewToken();

  //       const LS = localStorage.getItem('CurrentUser' || '{}');
  //       if (LS && newTokenRes.status === 401) {
  //         setExpireStatus(true);
  //         setTimeout(checkSignIn, 1000);
  //       } else if (LS && newTokenRes.status !== 401) {
  //         const newToken = await newTokenRes.json();

  //         const newDataUser: CurUser = {};
  //         newDataUser.message = JSON.parse(LS).message;
  //         newDataUser.userId = JSON.parse(LS).userId;
  //         newDataUser.name = JSON.parse(LS).name;
  //         newDataUser.token = newToken.token;
  //         newDataUser.refreshToken = newToken.refreshToken;
  //         localStorage.setItem('CurrentUser', JSON.stringify(newDataUser));
  //         // userContext.dispatchUserEvent('UPDATE_USER', newDataUser);
  //         dispatch({ type: 'UPDATE_USER', payload: newDataUser });
  //       }
  //     }
  //   });
  // };

  // const fetchPlayedWords = async () => {
  //   getPlayedWords(userId, token).then(async (response) => {
  //     if (response)
  //       if (response.status === 200) {
  //         const data = await response.json();
  //         const playedList = data[0].paginatedResults;
  //         setPlayedWords(playedList);
  //         setPlayedWords(learnedWords);
  //         setLoadingState(false);
  //       } else if (response.status === 401) {
  //         const newTokenRes = await getNewToken();
  //         const LS = localStorage.getItem('CurrentUser' || '{}');

  //         if (LS && newTokenRes.status === 401) {
  //           setExpireStatus(true);
  //           setTimeout(checkSignIn, 1000);
  //         } else if (LS && newTokenRes.status !== 401) {
  //           const newToken = await newTokenRes.json();

  //           const newDataUser: CurUser = {};
  //           newDataUser.message = JSON.parse(LS).message;
  //           newDataUser.userId = JSON.parse(LS).userId;
  //           newDataUser.name = JSON.parse(LS).name;
  //           newDataUser.token = newToken.token;
  //           newDataUser.refreshToken = newToken.refreshToken;
  //           localStorage.setItem('CurrentUser', JSON.stringify(newDataUser));
  //           // userContext.dispatchUserEvent('UPDATE_USER', newDataUser);
  //           dispatch({ type: 'UPDATE_USER', payload: newDataUser });
  //         }
  //       }
  //   });
  // };

  // useEffect(() => {
  //   if (props.part === 'hardwords') {
  //     if (hardWords && hardWords.length) {
  //       const hardList = hardWords.map((word) => ({
  //         ...word,
  //         isHardWord: true,
  //       }));
  //       setFinalWords(hardList);
  //     } else {
  //       setFinalWords([]);
  //     }
  //   } else {
  //     if (allWords && allWords.length) {
  //       if (learnedWords.length && hardWords.length) {
  //         const hardOrLearnedList = allWords.map((word) => {
  //           if (hardWords.find((w) => w._id === word.id)) {
  //             return {
  //               ...word,
  //               isHardWord: true,
  //             };
  //           } else if (learnedWords.find((w) => w._id === word.id)) {
  //             return {
  //               ...word,
  //               isLearnedWord: true,
  //             };
  //           }

  //           return word;
  //         });
  //         setFinalWords(hardOrLearnedList);
  //       } else if (hardWords.length && !learnedWords.length) {
  //         const onlyHardList = allWords.map((word) => {
  //           if (hardWords.find((w) => w._id === word.id)) {
  //             return {
  //               ...word,
  //               isHardWord: true,
  //             };
  //           }
  //           return word;
  //         });
  //         setFinalWords(onlyHardList);
  //       } else if (learnedWords.length && !hardWords.length) {
  //         const onlyLearnedList = allWords.map((word) => {
  //           if (learnedWords.find((w) => w._id === word.id)) {
  //             return {
  //               ...word,
  //               isLearnedWord: true,
  //             };
  //           }
  //           return word;
  //         });
  //         setFinalWords(onlyLearnedList);
  //       } else {
  //         setFinalWords(allWords);
  //       }
  //     } else {
  //       setFinalWords([]);
  //     }
  //   }
  // }, [allWords, hardWords, learnedWords, playedWords, props.part, props.page]);

  // useEffect(() => {
  //   try {
  //     fetchHardWords();
  //     fetchLearnedWords();
  //     fetchPlayedWords();
  //     if (props.part !== 'hardwords') {
  //       getPartOfTextbook(props.page, props.part).then((allWords) => {
  //         if (playedWords && playedWords.length) {
  //           const wordsPlayedList = allWords.map((word: WordItem) => {
  //             const playedWord = playedWords.find((w) => w._id === word.id);
  //             if (playedWord) {
  //               return {
  //                 ...word,
  //                 isNewWord: true,
  //                 successCounter:
  //                   playedWords[playedWords.indexOf(playedWord)].userWord.optional.successCounter,
  //                 failCounter:
  //                   playedWords[playedWords.indexOf(playedWord)].userWord.optional.failCounter,
  //               };
  //             }
  //             return word;
  //           });
  //           setAllWords(wordsPlayedList);
  //         } else {
  //           setAllWords(allWords);
  //           setLoadingState(false);
  //         }
  //       });
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [props.page, props.part]);

  // const onDataChanged = () => {
  //   fetchHardWords();
  //   fetchLearnedWords();
  //   fetchPlayedWords();
  //   if (props.part !== 'hardwords') {
  //     getPartOfTextbook(props.page, props.part).then((allWords) => {
  //       setAllWords(allWords);
  //       setLoadingState(false);
  //     });
  //   }
  // };
  const onDataChanged = () => {};

  return (
    <div>
      {/* <ModalExpire open={expireStatus} /> */}
      <StyledGrid container spacing={1}>
        {(isLoading || isLoadingUserWords) && <Loading />}

        {response.length
          ? response.map((item, i) => (
              <Grid item key={i} xs={12} sm={6} lg={4} xl={3}>
                <WordCard word={item} userWords={userWordsResponse} onDataChanged={onDataChanged} />
              </Grid>
            ))
          : null}
      </StyledGrid>
    </div>
  );
}

const StyledGrid = styled(Grid)`
  margin-bottom: 15px;
`;
