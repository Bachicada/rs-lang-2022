import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { createUserWord, deleteUserWord, getUserWord, getUserWords } from '../../services/UserWordService';
import { createUserStatistics, getUserStatistics } from '../../services/UserStatisticsService';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  title: string;
  labels: string[];
  lineTitle: string;
  data: number[];
}

// const userWords = getUserWords();
//   userWords.then((result) => console.log(result));
  // deleteUserWord('5e9f5ee35eb9e72bc21af718');
//   getUserWord('5e9f5ee35eb9e72bc21af718').then((res) => console.log(res ? res : 'not found'));
//   createUserWord({
//     wordId: "5e9f5ee35eb9e72bc21af718",
//     word: { difficulty: "hard", optional: {testFieldString: 'tessssst', testFieldBoolean: true} }
//   });
// interface UserStatistics {
//   learnedWords: number;
//   optional: UserStatisticsOptional;
// }
// createUserStatistics({learnedWords: 30, optional: {sprint: '[rightAnswers:30, wrongAnswers:0] 123'}});
// createUserStatistics({learnedWords: 30, optional: {audiocall: '[rightAnswers:20, wrongAnswers:10] 123'}});
// createUserStatistics({learnedWords: 333, optional: {}});
getUserStatistics().then((res) => console.log(res));

const Chart = (props: ChartProps) => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };
  
  const labels = props.labels;
  
  const data = {
    labels,
    datasets: [
      {
        label: props.lineTitle,
        data: props.data,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}

export default Chart;