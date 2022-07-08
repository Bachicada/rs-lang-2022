import WordCard from '../wordCard/WordCard';
import { useGetTextbookWords } from '../../hooks/useGetTextbookWords';
import Loading from '../shared/Loading';
import { useGetUserWords } from '../../hooks/useGetUserWords';
import { Grid, styled } from '@mui/material';

type Props = {
  part: string | undefined;
  page: string | undefined;
};
export default function WordsContainer({ part, page }: Props) {
  const pageNum = +(page || 0);
  const groupNum = +(part || 0);
  const { response, isLoading } = useGetTextbookWords({ page: pageNum, group: groupNum });

  const {
    response: userWordsResponse,
    error: userWordsError,
    isLoading: isLoadingUserWords,
    refetch: userWordsRefetch,
  } = useGetUserWords();

  const onDataChanged = () => {
    userWordsRefetch();
  };

  return (
    <>
      <StyledGrid container spacing={1}>
        {(isLoading || isLoadingUserWords) && <Loading />}

        {response.length
          ? response.map((item, i) => (
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
