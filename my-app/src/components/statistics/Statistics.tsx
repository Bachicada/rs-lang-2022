import { Box, Typography } from '@mui/material';
import styles from './stat.module.css';
import Utils from '../../utils/Utils';
import Chart from './Chart';
import ChartTitle from './ChartTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { APP_ROUTES } from '../../utils/Constants';
import { useUserContext } from '../../store/hooks';

const Statistics = () => {
  const [user, dispatch] = useUserContext();

  if (!user.userId) {
    return <Typography>Войдите в аккаунт, чтобы посмотреть статистику</Typography>;
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 64px - 25px - 48px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ width: '400px', height: '200px' }}>
        <Chart
          title="Изученные слова за каждый день"
          labels={['15/02/22', '16/02/22', '17/02/22']}
          lineTitle={'Кол-во слов'}
          data={[220, 60, 30]}
        />
      </div>
      <div style={{ width: '400px', height: '200px' }}>
        <Chart
          title="Всего изучено слов"
          labels={['15/02/22', '16/02/22', '17/02/22']}
          lineTitle={'Кол-во слов'}
          data={[220, 60, 30]}
        />
      </div>
    </Box>
  );
};

export default Statistics;
