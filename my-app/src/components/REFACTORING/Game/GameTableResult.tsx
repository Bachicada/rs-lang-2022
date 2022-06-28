import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dispatch, forwardRef, useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';
import { createUserStatistics, getUserStatistics } from '../../../services/UserStatisticsService';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { GameAnswers, SprintReducerAction, SprintActionTypes } from '../../../types/sprintTypes';
import { WordItem } from '../../../types/types';

type Props = {
  answers: GameAnswers[];
  isGameFinished: boolean;
  newWords: Promise<WordItem>[];
  dispatch: Dispatch<SprintReducerAction>;
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
    backgroundColor: theme.palette.error.main,
  },
  '&.success': {
    backgroundColor: theme.palette.success.main,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function GameTableResult({ answers, isGameFinished, newWords, dispatch }: Props) {
  const [score, setScore] = useState(answers);
  const [open, setOpen] = useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (isGameFinished) {
      const getScores = async () => {
        const data = await (
          await Promise.allSettled(newWords)
        ).map((item: any) => item.value.optional);
        dispatch({ type: SprintActionTypes.SET_SCORE, payload: data });
      };

      getScores().then(() => setScore([...answers]));

      // const obj = [{
      //   maxAnswersCount: quizState.maxAnswersCount,
      //   allCorrectCount: quizState.allCorrectCount,
      //   allIncorrectCount: quizState.allIncorrectCount,
      //   date: new Date().toLocaleDateString(),
      // }];
    }
  }, [answers, dispatch, isGameFinished, newWords]);

  useEffect(() => {
    const userJSON = localStorage.getItem('CurrentUser');
    if (!userJSON) {
      setOpen(true);
    }
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      {
        <Snackbar
          style={{ bottom: '50px' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Зарегистрируйтесь, чтобы увидеть результат!
          </Alert>
        </Snackbar>
      }
      <TableContainer sx={{ maxHeight: 440, width: '100%' }} component={Paper}>
        <Table sx={{ minWidth: 400 }} stickyHeader aria-label="sticky customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Слово</StyledTableCell>
              <StyledTableCell align="right">Перевод</StyledTableCell>
              <StyledTableCell align="right">Ответ</StyledTableCell>
              <StyledTableCell align="right">Всего</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {score.map((row) => (
              <StyledTableRow className={row.answer ? 'success' : 'fail'} key={row.item.id}>
                <StyledTableCell component="th" scope="row">
                  {row.item.word}
                </StyledTableCell>
                <StyledTableCell align="right">{row.item.wordTranslate}</StyledTableCell>
                <StyledTableCell align="right">{row.answer ? `✅` : `❌`}</StyledTableCell>
                <StyledTableCell align="right">
                  {(row.failCounter || row.failCounter === 0) &&
                  (row.successCounter || row.successCounter === 0) ? (
                    `${row.successCounter}/${row.successCounter + row.failCounter}`
                  ) : (
                    <Skeleton variant="text" />
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
