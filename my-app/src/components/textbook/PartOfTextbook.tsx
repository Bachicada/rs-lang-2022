import { APP_ROUTES } from '../../utils/Constants';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WordsContainer from './WordsContainer';
import PaginationComponent from './PaginationComponent';
import { styled, Typography } from '@mui/material';
import HardWordsContainer from './HardWordsContainer';

const PARTS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Сложные слова'];

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
      <StyledTypography variant="h5">
        Раздел {!isHardWords ? PARTS[+part] : 'Сложные слова'}
      </StyledTypography>

      {!isHardWords ? (
        <WordsContainer page={`${+pageNumber - 1}`} part={params.part} />
      ) : (
        <HardWordsContainer page={`${+pageNumber - 1}`} />
      )}

      <PaginationComponent page={params.page ?? ''} part={params.part ?? ''} />
    </div>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 15px;
`;
