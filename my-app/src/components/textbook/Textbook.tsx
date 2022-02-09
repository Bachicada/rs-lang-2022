import * as React from "react";
import { useEffect, useState } from "react";
import WordCard from '../shared/WordCard';
import styles from "./textbook.module.css";
import GamesMenu from './GamesMenu';
import { APP_ROUTES } from "../../utils/Constants";
import {Link} from 'react-router-dom';
import PartOfTextBook from "./PartOfTextbook";


export default function Textbook(){

  const [partNumber, setPartNumber] = useState<string | undefined>('0')

  return (
    <div> 
      <GamesMenu/>
      <h3> Учебник </h3>
      <ul className={styles.partList} onClick={(event)=>setPartNumber((event.target as HTMLElement).dataset.part)}>
          <li className={styles.partItem1} data-part='0' > Раздел 1
              {/*<Link to={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART1}`} className={styles.partLink}>Раздел 1</Link>*/}
          </li>
          <li className={styles.partItem2} data-part='1' > Раздел 2
              {/*<Link to={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART2}`} className={styles.partLink}>Раздел 2</Link>*/}
          </li>
          <li className={styles.partItem3} data-part='2' > Раздел 3
              {/*<Link to={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART3}`} className={styles.partLink}>Раздел 3</Link>*/}
          </li>
          <li className={styles.partItem4} data-part='3' >Раздел 4
              {/*<Link to={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART4}`} className={styles.partLink}>Раздел 4</Link>*/}
          </li>
          <li className={styles.partItem5} data-part='4' >Раздел 5
             {/*<Link to={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART5}`} className={styles.partLink}>Раздел 5</Link>*/}
          </li>
          <li className={styles.partItem6} data-part='5' >Раздел 6
              {/*<Link to={`${APP_ROUTES.TEXTBOOK}${APP_ROUTES.PART6}`} className={styles.partLink}>Раздел 6</Link>*/}
          </li>
        </ul>
        <PartOfTextBook part={partNumber} />
    </div>
  )
}
