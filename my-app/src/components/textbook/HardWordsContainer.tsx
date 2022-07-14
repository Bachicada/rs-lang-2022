import WordCard from '../wordCard/WordCard';
import Loading from '../shared/Loading';
import { useGetUserWords } from '../../hooks/useGetUserWords';
import { Grid, styled } from '@mui/material';
import { WORD_STATUS } from '../../utils/Constants';
import { useGetUserAggregatedWords } from '../../hooks/useGetUserAggregatedWords';
import { WordItem } from '../../types/types';
import { useEffect, useState } from 'react';

type Props = {
  page: string | undefined;
};
export default function HardWordsContainer({ page }: Props) {
  const [hardWords, setHardWords] = useState<WordItem[]>([]);

  const pageNum = +(page || 0);
  const { response, isLoading, refetch } = useGetUserAggregatedWords({ type: WORD_STATUS.HARD });

  const {
    response: userWordsResponse,
    error: userWordsError,
    isLoading: isLoadingUserWords,
  } = useGetUserWords();

  useEffect(() => {
    const newHardWords: WordItem[] = response.map((item) => {
      return {
        ...item,
        id: item._id,
        failCounter: 0,
        successCounter: 0,
      };
    });

    const start = pageNum * 20;
    const end = start + 20;

    setHardWords(newHardWords.slice(start, end));
  }, [pageNum, response]);

  const onDataChanged = () => {
    refetch();
  };

  return (
    <>
      <StyledGrid container spacing={1}>
        {(isLoading || isLoadingUserWords) && <Loading />}

        {hardWords.length
          ? hardWords.map((item, i) => (
              <Grid item key={i} xs={12} sm={6} lg={4} xl={3}>
                <WordCard
                  word={item}
                  userWords={userWordsResponse}
                  isUser={!userWordsError}
                  onDataChanged={onDataChanged}
                />
              </Grid>
            ))
          : null}
      </StyledGrid>
    </>
  );
}

const StyledGrid = styled(Grid)`
  margin-bottom: 15px;
  min-height: 300px;
`;
