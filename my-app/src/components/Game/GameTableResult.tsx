import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dispatch, forwardRef, memo, useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@mui/material';
import {
  createUserStatistics,
  getUserStatistics,
  updateUserStatistics,
} from '../../services/UserStatisticsService';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { GameAnswers, SprintReducerAction, SprintActionTypes } from '../../types/sprintTypes';
import { WordItem } from '../../types/types';
import Toast from '../shared/Toast';
import { useGetUserAggregatedWords } from '../../hooks/useGetAllUserAggregatedWords';

type Props = {
  answers: GameAnswers[];
  newWords: Promise<WordItem>[];
  setScore: (any: any) => void;
};

const GameTableResultComponent = ({ answers, newWords, setScore }: Props) => {
  const [open, setOpen] = useState(false);
  const [isMutated, setIsMutated] = useState(false);

  const { response } = useGetUserAggregatedWords();
  const wordsCount = response?.totalCount[0].count;

  useEffect(() => {
    if (!wordsCount || !answers.length) {
      return;
    }

    const count = answers.reduce((prev, curr) => {
      const { failCounter, successCounter } = curr;
      const counter = (failCounter || 0) + (successCounter || 0);

      if (counter === 1) {
        return prev + 1;
      }

      return prev;
    }, 0);

    const newData = {
      [new Date().toLocaleDateString()]: count,
    };

    const update = async () => {
      try {
        console.log('GAMETABLE: NEW DATA SENDED TO UPD: ', newData);
        await updateUserStatistics({ learnedWords: wordsCount, options: newData });
      } catch (e) {
        const { message } = e as Error;
        alert(message);
      }
    };

    update();
  }, [wordsCount]);

  useEffect(() => {
    const userJSON = localStorage.getItem('CurrentUser');
    if (!userJSON) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (isMutated) {
      return;
    }

    const getScores = async () => {
      const promiseData = await Promise.allSettled(newWords);
      const data = promiseData.map((item: any) => item.value?.optional);
      setScore(data);
      setIsMutated(true);
    };

    getScores();

    // const obj = [{
    //   maxAnswersCount: quizState.maxAnswersCount,
    //   allCorrectCount: quizState.allCorrectCount,
    //   allIncorrectCount: quizState.allIncorrectCount,
    //   date: new Date().toLocaleDateString(),
    // }];
  }, [newWords, setScore]);

  return (
    <>
      <Toast open={open} title={'Зарегистрируйтесь, чтобы увидеть результат!'} setOpen={setOpen} />

      <TableContainer
        sx={{ maxHeight: 'calc(100vh - 64px - 64px)', width: '100%' }}
        component={Paper}
      >
        <Table stickyHeader aria-label="sticky customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Слово</StyledTableCell>
              <StyledTableCell align="center">Перевод</StyledTableCell>
              <StyledTableCell align="center">Ответ</StyledTableCell>
              <StyledTableCell align="right">Всего</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {answers.map(({ answer, item, failCounter, successCounter }, idx) => {
              const isFailCounter = failCounter || failCounter === 0;
              const isSuccessCounter = successCounter || successCounter === 0;

              return (
                <StyledTableRow key={item.id} className={answer ? 'success' : 'fail'}>
                  {/* // <StyledTableRow key={item.id}> */}
                  <StyledTableCell component="th" scope="row" align="left">
                    {item.word}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item.wordTranslate}</StyledTableCell>
                  <StyledTableCell align="center">{answer ? `✅` : `❌`}</StyledTableCell>
                  <StyledTableCell align="right">
                    {isFailCounter && isSuccessCounter ? (
                      `${successCounter}/${successCounter + failCounter}`
                    ) : (
                      <Skeleton variant="text" />
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.fail': {
    // backgroundColor: theme.palette.error.main,
    backgroundColor: 'rgb(255 240 240)',
  },
  '&.success': {
    // backgroundColor: theme.palette.success.main,
    backgroundColor: 'rgb(240 255 240)',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const GameTableResult = memo(GameTableResultComponent);
export default GameTableResult;
