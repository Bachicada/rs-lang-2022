import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageProps, WordItem } from '../../types';
import styles from './textbook.module.css'
import { getHardWords, getPartOfTextbook, getUserId, getUserToken } from '../../services/WordService';
import WordCard from '../wordCard/WordCard';
import { LoadingIcon } from '../shared/LoadingIcon';


export default function WordsContainer(props: PageProps){
  const [pageWords, setWords] = useState ([]);
  const [loadingState, setLoadingState] = useState(true);
  
  const userId = getUserId();
  const token = getUserToken();

  const [words, setHardWords] = useState ([]);
 

  useEffect(() => {
    let displayWords:Array<WordItem> = [];
    if (props.part !=='hardwords'){
      getPartOfTextbook(props.page, props.part).then((pageWords)=>{
        console.log("pagewords",pageWords);

        setWords(pageWords);
        setLoadingState(false);
        displayWords = pageWords;
      })
    }
    else {
      getHardWords(userId, token).then(async (response)=>{
        console.log(response);
            const words = response[0].paginatedResults;
            console.log("hardwords", words)
            setWords(words)
            setLoadingState(false)
            displayWords = words;
    })
  }}, [props.page, props.part])

  return (
      <div>
         <h4>Слова</h4>
         <div className={styles.wordsCont}>
            { loadingState ? <LoadingIcon /> : ''}
            {pageWords.length > 0 && pageWords.map((item,i) => <WordCard key={i} word={item} />)}
         </div>
        </div>
  )
}