import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface LevelButtonProps {
  item: number;
  name: string;
  content: { level: number; name: string; img: string };
  setLevel: Dispatch<SetStateAction<number | null>>;
}

const StyledBox = styled('div')`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  box-shadow: 5px 5px 5px rgb(0 0 0 / 14%);
  background-color: #ffffffd6;
  width: 100%;
  min-height: 100px;
  width: 200px;
  height: 200px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #f5f5f5d6;
  }

  @media (min-width: 600px) {
    width: 250px;
    height: 250px;
  }

  @media (min-width: 992px) {
    width: 300px;
    height: 300px;
  }
`;

const StyledImg = styled('img')`
  width: 100%;
  height: 100%;
  position: absolute;
  top: -15%;
`;

const LevelButton = ({ item, name, content, setLevel }: LevelButtonProps) => {
  return (
    <StyledBox
      onClick={() => {
        setLevel(item - 1);
      }}
    >
      <StyledImg src={content.img} alt={name} />

      <Typography mb="7%" textAlign="center" fontSize="1.5rem" variant="body1" component="p">
        {name}
      </Typography>
    </StyledBox>
  );
};

export default LevelButton;
