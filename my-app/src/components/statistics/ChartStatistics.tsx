import { styled } from '@mui/material';
import Stack from '@mui/material/Stack';
import React from 'react';
import Chart from './Chart';

type Props = {
  labels: string[];
  values: number[];
  allValues: number[];
};

const ChartStatistics = ({ labels, values, allValues }: Props) => {
  return (
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
          labels={labels}
          lineTitle={'Кол-во слов'}
          data={allValues}
        />
      </Item>
    </Stack>
  );
};

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

export default ChartStatistics;
