import * as React from 'react';
import { APP_ROUTES } from '../../utils/Constants';
import { Link } from 'react-router-dom';
import styles from './textbook.module.css'
import { PartProps } from '../../types';
import { getPartOfTextbook } from '../../services/WordService';
import { useEffect, useState } from 'react';

import WordCard from '../shared/WordCard';
import PaginationRounded from './PaginationPages';


export default function PartOfTextBook(props: PartProps) {
    const [partWords, setPage] = useState<any[]>([])

    useEffect(() => {
      getPartOfTextbook(props.part). then((partWords)=>{
        console.log(partWords);
        setPage(partWords);
      })
    }, [props.part])

    const [pageNumber, setPageNumber] = useState<string | undefined>('1')


   return (
       <div>
       <h3>Раздел {Number(props.part)+1} </h3>
       <PaginationRounded />
       <h4>Слова</h4>
       <div className={styles.wordsCont}>
           { partWords.length > 0 && partWords.map((item) => <WordCard word={item} />)}
       </div>
       </div>
   )
} 
