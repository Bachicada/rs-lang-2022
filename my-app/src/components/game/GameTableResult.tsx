import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { QuizContext } from '../sprint/Sprint';

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
  const [quizState, dispatch] = React.useContext(QuizContext);
  
  return (
    <Paper sx={{width: 'calc(100% + 20px)', overflow: 'hidden'}}>
    <TableContainer sx={{maxHeight: 440, width: '103%'}} component={Paper}>
      <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Слово</StyledTableCell>
            <StyledTableCell align="right">Перевод</StyledTableCell>
            <StyledTableCell align="right">Ответ</StyledTableCell>
            <StyledTableCell align="right">Всего</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizState.answers.map((row) => (
            <StyledTableRow className={row.answer ? 'success' : 'fail'} key={row.item.id}>
              <StyledTableCell component="th" scope="row">
                {row.item.word}
              </StyledTableCell>
              <StyledTableCell align="right">{row.item.wordTranslate}</StyledTableCell>
              <StyledTableCell align="right">{row.answer ? `✅` : `❌`}</StyledTableCell>
              <StyledTableCell align="right">{row.successCounter}/{row.successCounter + row.failCounter}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}