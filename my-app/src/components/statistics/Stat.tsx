import { Box } from '@mui/material';
import * as React from 'react';
import styles from './stat.module.css'
import Utils from '../../utils/Utils';
import Chart from './Chart';
import ChartTitle from './ChartTitle'

const Stat = () => {
  if (!localStorage.getItem('CurrentUser')) {
    return <p>Войдите в аккаунт, чтобы посмотреть статистику</p>
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
      <div style={{width: '400px', height: '200px'}}>
        <ChartTitle>Title</ChartTitle>
        <Chart title='Все слова' labels={['15/02/22', '16/02/22', '17/02/22']} lineTitle={'слова'} data={[220, 60, 30]}/>
      </div>
      
    </Box>
  )   
} 


export default Stat;
// title: string;
// verticalTitle: string;
// data: ChartData;
// dataKey: string;