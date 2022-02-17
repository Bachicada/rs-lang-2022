import * as React from "react";
import { useEffect, useState} from "react";
import WordCard from '../wordCard/WordCard';
import { getAllUserWords, getHardWords, getUserId, getUserToken } from "../../services/WordService";
import { LoadingIcon } from "../shared/LoadingIcon";

export default function HardWordsPart(){
    const userId = getUserId();
    const token = getUserToken();

    const [words, setHardWords] = useState ([]);
    const [loadingState, setLoadingState] = useState(true);

   
    useEffect(() => {
       getHardWords(userId, token).then(async (response)=>{
         console.log(response)
         /*
         const words = response[0].paginatedResults;
         console.log(words)
         setHardWords(words)
         setLoadingState(false)*/
          }
    )},[])
    
    return (
        <div>HardWords
             { loadingState ? <LoadingIcon /> : ''}
             {words.length>0 && words.map((item,i) => <WordCard key={i} word={item} />)}
        </div>
    )
}
