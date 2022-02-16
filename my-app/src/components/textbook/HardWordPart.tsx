import * as React from "react";
import { useEffect, useState} from "react";
import WordCard from '../wordCard/WordCard';
import styles from "./textbook.module.css";
import GamesMenu from './GamesMenu';
import { APP_ROUTES } from "../../utils/Constants";
import {Link, useParams, useNavigate} from 'react-router-dom';
import PartOfTextBook from "./PartOfTextbook";
import { getHardWords, getUserId, getUserToken } from "../../services/WordService";

export default function HardWordsPart(){
    const userId = getUserId();
    const token = getUserToken();

    const [words, setHardWords] = useState ([]);
    const [loadingState, setLoadingState] = useState(true);
    
    useEffect(() => {
        getHardWords(userId, token).then(async (response)=>{
          console.log(response);
          if(response.status===200){
              const res = await response.json();
              const words = res[0].paginatedResults;
              console.log(words)
              setHardWords(words)
              setLoadingState(false)
          }
         else {
           return 'no info'
         }
         
        })
      },[])
   

    return (
        <div>HardWords
             {words.length>0 && words.map((item,i) => <WordCard key={i} word={item} />)}
        </div>
    )
}
 /*{words && words.map((item,i) => <WordCard key={i} word={item} />)}*/