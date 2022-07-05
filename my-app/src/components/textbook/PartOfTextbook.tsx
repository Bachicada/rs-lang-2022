import * as React from 'react';
import { APP_ROUTES } from '../../utils/Constants';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WordsContainer from './WordsContainer';
import PaginationComponent from './PaginationComponent';
import { Typography } from '@mui/material';

export default function PartOfTextBook() {
  const [pageNumber, setPageNumber] = useState('0');
  const [part, setPart] = useState('0');
  const navigate = useNavigate();

  const params = useParams<{ part: string; page: string }>();
  const isHardWords = params.part === 'hardwords';

  useEffect(() => {
    if (!params.page) {
      navigate(`${APP_ROUTES.TEXTBOOK}/${params.part}/1`);
    } else if (params.page !== 'hardwords') {
      setPageNumber(params.page);
      setPart(params.part ?? '0');
    }
  }, [params, navigate]);

  return (
    <div>
      <Typography variant="h5">Раздел {!isHardWords ? +part + 1 : 'Сложные слова'}</Typography>

      <WordsContainer page={(Number(pageNumber) - 1).toString()} part={params.part} />
      <PaginationComponent page={params.page ?? ''} part={params.part ?? ''} />
    </div>
  );
}
