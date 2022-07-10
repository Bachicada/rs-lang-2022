import { Box, Container, Grid, Typography } from '@mui/material';
import styles from './stat.module.css';
import Utils from '../../utils/Utils';
import Chart from './Chart';
import ChartTitle from './ChartTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { APP_ROUTES, WORD_STATUS } from '../../utils/Constants';
import { useUserContext } from '../../store/hooks';
import { useGetUserStatistics } from '../../hooks/useGetUserStatistics';
import Loading from '../shared/Loading';
import { useGetUserAggregatedWords } from '../../hooks/useGetUserAggregatedWords';

const Statistics = () => {
  const [user, dispatch] = useUserContext();
  const { response, error, isLoading } = useGetUserStatistics();

  const { response: responseHard, isLoading: isLoadingHard } = useGetUserAggregatedWords({
    type: WORD_STATUS.HARD,
  });
  const { response: responseLearned, isLoading: isLoadingLearned } = useGetUserAggregatedWords({
    type: WORD_STATUS.LEARNED,
  });

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
          Всего новых слов: {response?.learnedWords} слов
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
            labels={['10/07/22', '11/07/22', '12/07/22']}
            lineTitle={'Кол-во слов'}
            data={[220, 60, 30]}
          />
        </Grid>

        <Grid item xs={6}>
          <Chart
            title="Всего изучено слов"
            labels={['10/07/22', '11/07/22', '12/07/22']}
            lineTitle={'Кол-во слов'}
            data={[220, 280, 310]}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Statistics;
