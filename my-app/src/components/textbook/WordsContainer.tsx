import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageProps } from '../../types';
import styles from './textbook.module.css'
import { getPartOfTextbook } from '../../services/WordService';
import WordCard from '../shared/WordCard';


export default function WordsContainer(props: PageProps){
  const [pageWords, setWords] = useState ([]);

  useEffect(() => {
    getPartOfTextbook(props.page, props.part).then((pageWords)=>{
      console.log(pageWords);
      setWords(pageWords);
    })
  }, [props.page, props.part])

  return (
      <div>
         <h4>Слова</h4>
         <div className={styles.wordsCont}>
            { pageWords.length > 0 && pageWords.map((item,i) => <WordCard key={i} word={item} />)}
         </div>
        </div>
  )
}