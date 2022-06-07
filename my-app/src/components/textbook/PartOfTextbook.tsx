import * as React from 'react';
import { APP_ROUTES } from '../../utils/Constants';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import WordsContainer from './WordsContainer';

export default function PartOfTextBook() {
  const [pageNumber, setPageNumber] = useState("0");
  const params = useParams<{ part: string; page: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.page) {
      navigate(`${APP_ROUTES.TEXTBOOK}/${params.part}/1`);
    } else if(params.page !=='hardwords') {
      setPageNumber(params.page);
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

          <WordsContainer page={(Number(pageNumber)-1).toString()} part={params.part}/>
       </div>
   )
} 
