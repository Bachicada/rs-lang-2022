import * as React from 'react';
import { APP_ROUTES } from '../../utils/Constants';
import { Link } from 'react-router-dom';
import styles from './textbook.module.css'
import { PartProps } from '../../types';
import { getPartOfTextbook } from '../../services/WordService';
import { useEffect, useState } from 'react';


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import WordsContainer from './WordsContainer';

export default function PartOfTextBook(props: PartProps) {
    const [pageNumber, setPageNumber] = useState('0');
 
    function checkPage(event: React.SyntheticEvent): string{
      //target.ariaLabel returns `Go to page 1(2,3...)`
      const target = (event.target as HTMLButtonElement).ariaLabel;
      let pageNumber;
      if (target ===`page 1`){
        pageNumber = (Number(target.replace(`page `,``)) - 1).toString()
      }
      else{
        pageNumber = (Number(target.replace(`Go to page `,``)) - 1).toString();
      }
      console.log(pageNumber)
      return pageNumber;
    }
    
    const styles = {
      ul: {
        justifyContent:'space-between',
      }
  };
   return (
       <div>
          <h3>Раздел {Number(props.part)+1} </h3>
          <Stack spacing={2}>
              <Pagination  sx={styles} boundaryCount={4} siblingCount={2} count={30} variant="outlined" shape="rounded" onClick={(event)=>(setPageNumber(checkPage(event)))}/>
          </Stack>
          <Link to={`${APP_ROUTES.MAIN}${APP_ROUTES.TEXTBOOK}/part=${props.part}/page=${pageNumber}`}>
              <WordsContainer page={pageNumber} part={props.part}/>
          </Link>
          

       </div>
   )
} 

