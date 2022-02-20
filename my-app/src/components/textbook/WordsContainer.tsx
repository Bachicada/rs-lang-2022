import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { CurUser, PageProps, UserWordItem, WordItem } from '../../types';
import styles from './textbook.module.css'
import { getHardWords, getLearnedWords, getNewToken, getPartOfTextbook, getPlayedWords, getUserId, getUserToken, getWords } from '../../services/WordService';
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

  const navigate = useNavigate();

  const checkSignIn = ()=>{
    localStorage.clear();
    userContext.dispatchUserEvent("CLEAR_USER", {});
    navigate(`${APP_ROUTES.SIGNIN}`);
}

const [hardWords, setHardWords] =  useState<WordItem[]>([]);
const [learnedWords, setLearnedWords] = useState<WordItem[]>([]);
const [allWords, setAllWords] =  useState<WordItem[]>([]);
const [playedWords, setPlayedWords] =  useState<WordItem[]>([]);
const [finalWords, setFinalWords] =  useState<WordItem[]>([]);


const fetchHardWords = async () =>{
  getHardWords(userId, token).then(async (response)=>{
    //console.log(response);
    if (response)
    if (response.status===200){
      const data = await response.json();
      const hardWords = data[0].paginatedResults;
      console.log("hardWords", hardWords);
        setHardWords(hardWords);
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
          newDataUser.token = newToken.token;
          console.log(newToken.token);
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
}

const fetchLearnedWords = async () =>{
  getLearnedWords(userId, token).then(async (response)=>{
  //console.log(response);
  if (response.status===200){
    const data = await response.json();
    const learnedWords = data[0].paginatedResults;
    console.log("learnedWords", learnedWords);
      setLearnedWords(learnedWords);
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
        newDataUser.token = newToken.token;
        console.log(newToken.token);
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
console.log("learned",learnedWords)
}

const fetchPlayedWords = async()=>{
   
    const played = await getPlayedWords(userId, token);
    if (played){
      const a = await played.json();
      const playedList = a[0].paginatedResults;
      console.log('played', playedList)
      setPlayedWords(playedList);
    }
}


useEffect(() =>{

  if (props.part === 'hardwords') {
    if (hardWords && hardWords.length) {
      const b = hardWords.map((word) =>({
        ...word,
        isHardWord:true
      }));
      console.log('1',b)
      setFinalWords(b)
    } else {
      setFinalWords([]);
    }
  } else {
    if (allWords && allWords.length) {   
      if (learnedWords.length && hardWords.length) {

        const hl = allWords.map((word) =>{
           if (hardWords.find((w) => w._id === word.id)) {
            return{
              ...word,
              isHeardWord: true
            }
          }
          else if (learnedWords.find((w) => w._id === word.id)) {
            return{
              ...word,
              isLearnedWord: true
            }
          }
        
        return word;
      })
        console.log('4',hl)
        setFinalWords(hl);
      }
      else if (hardWords.length && !learnedWords.length) {
      const a = allWords.map((word) =>{
        if (hardWords.find((w) => w._id === word.id)) {
          return{
            ...word,
            isHardWord: true
          }
        }
      return word;
    })
      console.log('2',a)
      setFinalWords(a)
    } 
      else if (learnedWords.length && !hardWords.length) {
      const l = allWords.map((word) =>{
        if (learnedWords.find((w) => w._id === word.id)) {
          return{
            ...word,
            isLearnedWord: true
          }
        }
      return word;
    })
      console.log('3',l)
      setFinalWords(l);
    }
      else {
      console.log('5',allWords)
      setFinalWords(allWords);
    }
    } else {
      setFinalWords([]);
    }
  }
console.log("learnedWords.length && hardWords", learnedWords && hardWords);

console.log("hardWords.length && !learnedWords.length", hardWords.length && !learnedWords.length);

console.log("learnedWords.length && !hardWords.length", learnedWords.length && !hardWords.length);

},[allWords,hardWords,learnedWords,playedWords,props.part,props.page])

useEffect(() => {
  try{
    fetchHardWords();
    fetchLearnedWords();
    fetchPlayedWords();
    if (props.part !=='hardwords'){
      getPartOfTextbook(props.page, props.part).then((allWords)=>{
      
        if (playedWords && playedWords.length){
         
        const wordsPlayedList = allWords.map((word:WordItem)=>{
          const playedWord = playedWords.find((w) => w._id === word.id)
          if (playedWord){
            return{
              ...word,
              isNewWord: true,
              successCounter: playedWords[playedWords.indexOf(playedWord)].userWord.optional.successCounter,
              failCounter: playedWords[playedWords.indexOf(playedWord)].userWord.optional.failCounter,
            }
          }
          return word;
        })
        setAllWords(wordsPlayedList);
        }
        else {
          setAllWords(allWords);
          setLoadingState(false);
        }
      })
    }
  }
  catch (e) {
    console.error(e)
} 
 }, [props.page, props.part])

const onDataChanged = () =>{
  console.log('first', props.part)
  fetchHardWords();
  fetchLearnedWords();
  fetchPlayedWords();
  if (props.part !=='hardwords'){
    getPartOfTextbook(props.page, props.part).then((allWords)=>{

      setAllWords(allWords);
      setLoadingState(false);
    })
  }
}

  return (

      <div>
         < ModalExpire open = {expireStatus}/>
         <h4>Слова</h4>
         <div className={styles.wordsCont}>
            { loadingState ? <LoadingIcon /> : ''}

            {finalWords.length > 0 && finalWords.map((item,i) => <WordCard key={i} word={item} onDataChanged={onDataChanged}/>)}

         </div>
        </div>

  )
}