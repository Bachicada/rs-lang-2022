import { Box } from '@mui/material';
import * as React from 'react';
import styles from './stat.module.css'
import Chart from './Chart';

export default class Stat extends React.Component {
    render(){
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
          <Chart></Chart>
          </div>
        </Box>
      )   
    }
} 