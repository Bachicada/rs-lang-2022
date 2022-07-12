import { Container, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { WORD_STATUS } from '../../utils/Constants';
import { useUserContext } from '../../store/hooks';
import { useGetUserStatistics } from '../../hooks/useGetUserStatistics';
import Loading from '../shared/Loading';
import { useGetUserAggregatedWords } from '../../hooks/useGetUserAggregatedWords';
import TextStatistics from './TextStatistics';
import ChartStatistics from './ChartStatistics';

const Statistics = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [allValues, setAllValues] = useState<number[]>([]);

  const [user] = useUserContext();
  const { response, isLoading } = useGetUserStatistics();

  const { response: responseHard, isLoading: isLoadingHard } = useGetUserAggregatedWords({
    type: WORD_STATUS.HARD,
  });
  const { response: responseLearned, isLoading: isLoadingLearned } = useGetUserAggregatedWords({
    type: WORD_STATUS.LEARNED,
  });

  useEffect(() => {
    if (response?.optional?.data) {
      const arr = JSON.parse(response.optional.data);
      const keys = arr.map((item: any) => Object.keys(item)).flat();
      const values = arr.map((item: any) => Object.values(item)).flat();

      let sum = 0;
      const allValues = values.map((item: number) => {
        sum += item;
        return sum;
      });

      setLabels(keys);
      setValues(values);
      setAllValues(allValues);
    }
  }, [response?.optional?.data]);

  if (!user.userId) {
    return <Typography>Войдите в аккаунт, чтобы посмотреть статистику</Typography>;
  }

  if (isLoading || isLoadingHard || isLoadingLearned) {
    return <Loading />;
  }

  return (
    <StyledContainer maxWidth="lg">
      <TextStatistics
        allWords={response?.learnedWords || 0}
        hardWords={responseHard.length}
        learnedWords={responseLearned.length}
      />

      <ChartStatistics labels={labels} values={values} allValues={allValues} />
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  padding-top: 20px;
`;

export default Statistics;
