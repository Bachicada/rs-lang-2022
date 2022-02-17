import * as React from 'react';
import { APP_ROUTES } from '../../utils/Constants';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './textbook.module.css'
import { PartProps } from '../../types';
import { getPartOfTextbook } from '../../services/WordService';
import { useEffect, useState } from 'react';


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import WordsContainer from './WordsContainer';

export default function PartOfTextBook() {
  const [pageNumber, setPageNumber] = useState("0");
  const [currentPart, setCurrentPart] = useState<string>("0");
  const params = useParams<{ part: string; page: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.page) {
      navigate(`${APP_ROUTES.TEXTBOOK}/${params.part}/0`);
    } else if(params.page !=='hardwords') {
      setPageNumber(params.page);
    }
    if (params.part) {
      console.log('params', params)
      setCurrentPart(params.part);
    }
  }, [params, navigate]);

    const styles = {
      ul: {
        justifyContent:'space-between',
      }
  };

   return (
       <div>
          <h3>Раздел  
            {params.part !== 'hardwords' ?  <span>  {Number(params.part)+1} </span>: <span> Сложные слова </span> }
            </h3>
            {params.part !== 'hardwords' ?
          <Stack spacing={2}>
              <Pagination  
                  sx={styles} 
                  boundaryCount={4} 
                  siblingCount={2} 
                  page={(params.page && parseInt(params.page, 10)) || 1}
                  count={30} 
                  variant="outlined" 
                  shape="rounded" 
                  onChange={(event: React.ChangeEvent<unknown>, value: number) => {
                    navigate(`${APP_ROUTES.TEXTBOOK}/${params.part}/${value}`);
                  }}
              />
          </Stack> :
          ''}

          <WordsContainer page={pageNumber} part={params.part}/>
       </div>
   )
} 
