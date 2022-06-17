import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AudioContext } from './Audiocall';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Skeleton } from '@mui/material';
import { useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
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
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
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

export default function GameTableResult() {
  const [quizState, dispatch] = React.useContext(AudioContext);
  const [score, setScore] = React.useState(quizState.answers);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (quizState.isGameFinished) {
      const getScores = async () => {
        const data = await (
          await Promise.allSettled(quizState.new)
        ).map((item: any) => item.value.optional);
        dispatch({ type: 'SET_SCORE', payload: data });
      };

      getScores().then(() => setScore([...quizState.answers]));

      // const obj = [{
      //   maxAnswersCount: quizState.maxAnswersCount,
      //   allCorrectCount: quizState.allCorrectCount,
      //   allIncorrectCount: quizState.allIncorrectCount,
      //   date: new Date().toLocaleDateString(),
      // }];
    }
  }, [quizState.isGameFinished]);

  useEffect(() => {
    const userJSON = localStorage.getItem('CurrentUser');
    console.log('NUUU?', userJSON);
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
              <StyledTableCell align="right">Аудио</StyledTableCell>
              <StyledTableCell align="right">Ответ</StyledTableCell>
              <StyledTableCell align="right">
                Всего
                {/* <Tooltip title="Зарегистрируйтесь, для просмотра статистики">
                <QuestionMarkIcon/>
              </Tooltip> */}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {score.map((row) => (
              <StyledTableRow className={row.answer ? 'success' : 'fail'} key={row.item.id}>
                <StyledTableCell component="th" scope="row">
                  {row.item.word}
                </StyledTableCell>
                <StyledTableCell align="right">{row.item.wordTranslate}</StyledTableCell>
                <StyledTableCell align="right">
                  {
                    <div
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        row.audio.play();
                      }}
                    >
                      <VolumeUpIcon />
                    </div>
                  }
                </StyledTableCell>
                <StyledTableCell align="right">{row.answer ? `✅` : `❌`}</StyledTableCell>
                {/* <StyledTableCell align="right">{row.successCounter}/{row.successCounter + row.failCounter}</StyledTableCell> */}
                <StyledTableCell align="right">
                  {row.successCounter || row.successCounter === 0 ? (
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
