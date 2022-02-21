import * as React from "react";
import { useContext, useEffect, useState} from "react";
import WordCard from '../wordCard/WordCard';
import styles from "./textbook.module.css";
import GamesMenu from './GamesMenu';
import { APP_ROUTES } from "../../utils/Constants";
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom';
import PartOfTextBook from "./PartOfTextbook";
import { UserContext } from "../../App";
import { CurUser } from "../../types";


export default function Textbook(){
  const userContext = useContext<{ user: CurUser; dispatchUserEvent: (actionType: string, payload: CurUser) => void; }>(
    UserContext
  );

  const [partNumber, setPartNumber] = useState<string | undefined>("0");
  const params = useParams< string >();
  const navigate = useNavigate();

  let location = useLocation();
 console.log('location', location)

 useEffect(() => {
  
  localStorage.setItem('CurrentLink',location.pathname)
  window.addEventListener("beforeunload", ()=> localStorage.setItem('CurrentLink',location.pathname));
  return () => window.removeEventListener("beforeunload", ()=> localStorage.setItem('CurrentLink',location.pathname));
}, []);

useEffect(() => {
  
  const path = localStorage.getItem('CurrentLink');
  const checkPage = () =>{
    if (path){
      navigate(`${path}`)
    }
    else {
     navigate(`${APP_ROUTES.MAIN}`)
    }
  }
  window.addEventListener('domcontentloaded', checkPage);
  return () => window.removeEventListener('domcontentloaded', checkPage);
}, []);

 

  useEffect(() => {
    if ((!params.part) && (params.part !=="hardWords")){
      navigate(`${APP_ROUTES.TEXTBOOK}/1`);
    }
  }, [params, navigate]);

  function checkNav(event: React.SyntheticEvent){
    if ((event.target as HTMLElement).dataset.part!=="hardWords"){
      navigate(`${APP_ROUTES.TEXTBOOK}/${(event.target as HTMLElement).dataset.part}/${params.page}`)
    }
    else {
      navigate(`${APP_ROUTES.TEXTBOOK}/hardwords`)
    }
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
          {userContext.user.name ? 
            <li className={styles.partItem5} data-part='hardWords'
             onClick={(event)=>checkNav(event)} >
              Сложные
             </li>:
              ''
            }
        </ul>
        <PartOfTextBook />
    </div>
  )
}
