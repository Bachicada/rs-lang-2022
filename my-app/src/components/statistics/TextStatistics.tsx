import { Stack, styled } from '@mui/material';
import React from 'react';

type Props = {
  allWords: number;
  hardWords: number;
  learnedWords: number;
};

const TextStatistics = ({ allWords, hardWords, learnedWords }: Props) => {
  return (
    <StyledStack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
      <Item>Всего новых слов: {allWords}</Item>
      <Item>Сложных: {hardWords}</Item>
      <Item>Изученных: {learnedWords}</Item>
    </StyledStack>
  );
};

const StyledStack = styled(Stack)`
  margin-bottom: 20px;
`;

const Item = styled('div')`
  // padding: 10px;
  // border-radius: 45px;
  // box-shadow: 5px 5px 5px rgb(0 0 0 / 14%);
  // text-align: center;
  // background-color: #ffffffd6;
  // cursor: pointer;
  // transition: all 0.2s ease-in-out;

  padding: 10px;
  border-radius: 4px;
  font-family: Roboto;
  box-shadow: 5px 5px 5pxrgb (0 0 0 / 14%);
  text-align: center;
  background-color: #ffffff85;
  transition: all 0.2s ease-in-out;
`;

export default TextStatistics;
