import { Box, Container, Grid, Stack, styled, Typography } from '@mui/material';
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
import TextStatistics from './TextStatistics';

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
    <StyledContainer maxWidth="lg">
      <TextStatistics
        allWords={response?.learnedWords || 0}
        hardWords={responseHard.length}
        learnedWords={responseLearned.length}
      />

      <Stack alignItems="center" direction={{ xs: 'column', lg: 'row' }} spacing={1}>
        <Item>
          <Chart
            title="Изученные слова за каждый день"
            labels={labels}
            lineTitle={'Кол-во слов'}
            data={values}
          />
        </Item>

        <Item>
          <Chart
            title="Всего изучено слов"
            labels={['10/07/22', '11/07/22', '12/07/22']}
            lineTitle={'Кол-во слов'}
            data={[100, 200, 300]}
          />
        </Item>
      </Stack>
    </StyledContainer>
  );
};

const StyledContainer = styled(Container)`
  padding-top: 20px;
`;

const Item = styled('div')`
  width: 100%;
  height: 300px;
  padding: 10px;
  border-radius: 4px;
  font-family: Roboto;
  box-shadow: 5px 5px 5pxrgb (0 0 0 / 14%);
  text-align: center;
  background-color: #ffffff85;
  transition: all 0.2s ease-in-out;
`;

export default Statistics;
