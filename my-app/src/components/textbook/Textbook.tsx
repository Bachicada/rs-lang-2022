import * as React from "react";
import { useEffect, useState} from "react";
import WordCard from '../shared/WordCard';
import styles from "./textbook.module.css";
import GamesMenu from './GamesMenu';
import { APP_ROUTES } from "../../utils/Constants";
import {Link, useParams, useNavigate} from 'react-router-dom';
import PartOfTextBook from "./PartOfTextbook";


export default function Textbook(){
  const [partNumber, setPartNumber] = useState<string | undefined>("0");
  const params = useParams< string >();
  const navigate = useNavigate();

  console.log(params)
  useEffect(() => {
    if (!params.part) {
      navigate(`${APP_ROUTES.TEXTBOOK}/1`);
    }
  }, [params, navigate]);

  function checkNav(event: React.SyntheticEvent){
    navigate(`${APP_ROUTES.TEXTBOOK}/${(event.target as HTMLElement).dataset.part}/${params.page}`)
  }  

  return (
    <div> 
      <GamesMenu/>
      <h3> Учебник </h3>
      <ul className={styles.partList}>
          <li className={styles.partItem1} data-part='0'  
             onClick={(event)=>checkNav(event)} > 
             Раздел 1
          </li>
          <li className={styles.partItem2} data-part='1'  
             onClick={(event)=>checkNav(event)} > 
             Раздел 2
          </li>
          <li className={styles.partItem3} data-part='2'  
             onClick={(event)=>checkNav(event)} > 
             Раздел 3
          </li>
          <li className={styles.partItem3} data-part='3'  
             onClick={(event)=>checkNav(event)} > 
             Раздел 4
          </li>
          <li className={styles.partItem4} data-part='4'  
             onClick={(event)=>checkNav(event)} > 
             Раздел 5
          </li>
          <li className={styles.partItem5} data-part='5'  
             onClick={(event)=>checkNav(event)} > 
             Раздел 6
          </li>
        </ul>
        <PartOfTextBook />
    </div>
  )
}
