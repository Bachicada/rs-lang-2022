import * as React from 'react';
import { APP_ROUTES } from '../../utils/Constants';
import { Link } from 'react-router-dom';
import styles from './textbook.module.css'
import { PartProps } from '../../types';
import { getPartOfTextbook } from '../../services/WordService';
import { useEffect, useState } from 'react';
import { setSourceMapRange } from 'typescript';
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

   return (
       <div>
       <p>Раздел {Number(props.part)+1} </p>
       <PaginationRounded />
       <div>
           Слова 
           { partWords.length > 0 && partWords.map((item) => <WordCard word={item} />)}
       </div>
       </div>
   )
} 
