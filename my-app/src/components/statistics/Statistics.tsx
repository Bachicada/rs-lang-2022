import { Box, Container, Grid, Typography } from '@mui/material';
import styles from './stat.module.css';
import Utils from '../../utils/Utils';
import Chart from './Chart';
import ChartTitle from './ChartTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { APP_ROUTES, WORD_STATUS } from '../../utils/Constants';
import { useUserContext } from '../../store/hooks';
import { useGetUserStatistics } from '../../hooks/useGetUserStatistics';
import Loading from '../shared/Loading';
import { useGetUserAggregatedWords } from '../../hooks/useGetUserAggregatedWords';

const Statistics = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  const [user, dispatch] = useUserContext();
  const { response, error, isLoading } = useGetUserStatistics();

  const { response: responseHard, isLoading: isLoadingHard } = useGetUserAggregatedWords({
    type: WORD_STATUS.HARD,
  });
  const { response: responseLearned, isLoading: isLoadingLearned } = useGetUserAggregatedWords({
    type: WORD_STATUS.LEARNED,
  });

  useEffect(() => {
    if (response?.optional?.data) {
      const arr = JSON.parse(response.optional.data);
      console.log('statistics : ', arr);
      console.log(Array.isArray(arr));
      const keys = arr.map((item: any) => Object.keys(item)).flat();
      const values = arr.map((item: any) => Object.values(item)).flat();
      setLabels(keys);
      setValues(values);
    }
  }, [response?.optional?.data]);

  if (!user.userId) {
    return <Typography>Войдите в аккаунт, чтобы посмотреть статистику</Typography>;
  }

  if (isLoading || isLoadingHard || isLoadingLearned) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={4}>
          Всего новых слов: {response?.learnedWords || 0} слов
        </Grid>
        <Grid item xs={4}>
          Сложных: {responseHard.length} слов
        </Grid>
        <Grid item xs={4}>
          Изученных: {responseLearned.length} слов
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Chart
            title="Изученные слова за каждый день"
            labels={labels}
            lineTitle={'Кол-во слов'}
            data={values}
          />
        </Grid>

        <Grid item xs={6}>
          <Chart
            title="Всего изучено слов"
            labels={['10/07/22', '11/07/22', '12/07/22']}
            lineTitle={'Кол-во слов'}
            data={[100, 200, 300]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Statistics;
