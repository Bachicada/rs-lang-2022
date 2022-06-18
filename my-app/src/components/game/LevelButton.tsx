import styled from '@emotion/styled';
import { Box, Fab, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { getPartOfTextbook } from '../../services/WordService';
import Utils from '../../utils/Utils';
import { QuizContext } from '../sprint/Sprint';

interface LevelButtonProps {
  item: number;
  name: string;
  content: { level: number; name: string; img: string };
}

const StyledBox = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  // box-shadow: 3px 3px 4px rgb(161 160 160 / 22%);
  box-shadow: 5px 5px 5px rgb(0 0 0 / 14%);
  background-color: #fff;
  width: 100%;
  min-height: 100px;
  // width: 300px;
  // height: 300px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #f5f5f5;
  }
`;

const StyledImg = styled('img')`
  width: 100%;
  height: 100%;
  position: absolute;
  top: -15%;
`;

const LevelButton = ({ item, name, content }: LevelButtonProps) => {
  const [quizState, dispatch] = useContext(QuizContext);
  const [level, setLevel] = useState<number>();

  useEffect(() => {
    if (level || level === 0) {
      const fetchData = async () => {
        dispatch({ type: 'LOADING' });
        try {
          const data = [
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
            await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
          ];
          const result = Utils.getRandomWords(data);
          dispatch({ type: 'CHANGE_LEVEL', payload: { result, level } });
        } catch (err) {
          alert('Oops! Something goes wrong.');
        }
      };

      fetchData();
    }
  }, [level]);

  return (
    // <Fab
    //   color="primary"
    //   style={{ width: '60px', height: '60px' }}
    // onClick={() => {
    //   setLevel(item - 1);
    // }}
    // >
    //   {item}
    // </Fab>
    // <Box sx={{ backgroundColor: 'primary.main', width: '100%', minHeight: '100px' }}>{item}</Box>
    <StyledBox
      onClick={() => {
        setLevel(item - 1);
      }}
    >
      <StyledImg src={content.img} alt={name} />
      <Typography mb="7%" fontSize="1.5rem" variant="body1" component="p">
        {name}
      </Typography>
    </StyledBox>
  );
};

export default LevelButton;
