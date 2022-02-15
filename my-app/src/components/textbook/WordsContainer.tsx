import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageProps, WordItem } from '../../types';
import styles from './textbook.module.css'
import { getPartOfTextbook } from '../../services/WordService';
import WordCard from '../wordCard/WordCard';
import { LoadingIcon } from '../shared/LoadingIcon';


export default function WordsContainer(props: PageProps){
  const [pageWords, setWords] = useState ([]);
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    
    getPartOfTextbook(props.page, props.part).then((pageWords)=>{
      console.log(pageWords);
      setWords(pageWords);
      setLoadingState(false)
    })
  }, [props.page, props.part])

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