import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { CurUser, PageProps, WordItem } from '../../types';
import styles from './textbook.module.css'
import { getHardWords, getNewToken, getPartOfTextbook, getUserId, getUserToken } from '../../services/WordService';
import WordCard from '../wordCard/WordCard';
import { LoadingIcon } from '../shared/LoadingIcon';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../utils/Constants';
import ModalExpire from '../shared/ModalExpire';


export default function WordsContainer(props: PageProps){
  const [pageWords, setWords] = useState ([]);
  const [loadingState, setLoadingState] = useState(true);
  
  const userId = getUserId();
  const token = getUserToken();
  

  const userContext = useContext<{
    user: CurUser;
    dispatchUserEvent:  (actionType: string, payload: CurUser) => void;
  }>(UserContext);
  
 
  const [expireStatus, setExpireStatus]  = useState(false);
  const [hardWords, setHardWords] =  useState<WordItem[]>([]);
  const [allWords, setAllWords] =  useState<WordItem[]>([]);

  const navigate = useNavigate();

  const checkSignIn = ()=>{
    localStorage.clear();
    userContext.dispatchUserEvent("CLEAR_USER", {});
    navigate(`${APP_ROUTES.SIGNIN}`);
}
 
const [bg, setBg] = useState('#fff');
const [hardChecked, setHardChecked] = useState(false);

  useEffect(() => {

    if (props.part !=='hardwords'){
      getPartOfTextbook(props.page, props.part).then((pageWords)=>{
        console.log("pagewords",pageWords);
        setWords(pageWords);
        setBg('#fff');
        setHardChecked(false);
        setLoadingState(false);
      })
    }
    else {
      getHardWords(userId, token).then(async (response)=>{
        console.log(response);
        if (response.status===200){
          const data = await response.json();
          const words = data[0].paginatedResults;
          console.log("hardWords", words);
            setWords(words);
            setBg('pink');
            //setHardChecked(true);
            setLoadingState(false);
        }
        else if (response.status===401){
          const newTokenRes = await getNewToken();
          console.log('второй ответ', newTokenRes )

          const LS = localStorage.getItem('CurrentUser'||'{}');
         
         if(LS && (newTokenRes.status !==401)){
              const newToken = await newTokenRes.json();
              console.log ('this new token', newToken)
              
              const newDataUser: CurUser = {};
              newDataUser.message = JSON.parse(LS).message;
              newDataUser.userId = JSON.parse(LS).userId;
              newDataUser.name = JSON.parse(LS).name;
              newDataUser.token = JSON.parse(newToken).token;
              newDataUser.refreshToken = JSON.parse(newToken).refreshToken;
              localStorage.setItem('CurrentUser', JSON.stringify(newDataUser));
              userContext.dispatchUserEvent("UPDATE_USER", newDataUser);
          }
          else if(LS && (newTokenRes.status === 401)){
              console.log ('все истекло', newTokenRes)
              setExpireStatus(true);
              setTimeout(checkSignIn, 1000);
          }
    }})
  }}, [props.page, props.part])

  return (
      <div>
         < ModalExpire open = {expireStatus}/>
         <h4>Слова</h4>
         <div className={styles.wordsCont}>
            { loadingState ? <LoadingIcon /> : ''}
            {pageWords.length > 0 && pageWords.map((item,i) => <WordCard key={i} word={item} bgColor={bg} /*hardChecked={hardChecked}*/ />)}
         </div>
        </div>
  )
}