import { IconButton, styled, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { Markup } from 'interweave';
import React from 'react';
import { WordItem } from '../../types/types';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  word: WordItem;
  isOpen: boolean;
  successCounter: number;
  failCounter: number;
  handleClose: () => void;
};

const WordCardBackdrop = ({ word, isOpen, successCounter, failCounter, handleClose }: Props) => {
  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpen}
      onClick={handleClose}
    >
      <Container>
        <StyledIconButton aria-label="delete" size="small">
          <CloseIcon />
        </StyledIconButton>

        <Typography variant="body2" textAlign="center">
          Статистика {successCounter} / {failCounter + successCounter}
        </Typography>

        <Typography variant="h5">Значение слова:</Typography>
        <StyledMarkup containerTagName="p" content={word.textMeaning} />
        <Typography sx={{ marginBottom: '16px' }}>{word.textMeaningTranslate}</Typography>

        <Typography variant="h5">Пример использования:</Typography>
        <StyledMarkup containerTagName="p" content={word.textExample} />
        <Typography>{word.textExampleTranslate}</Typography>
      </Container>
    </Backdrop>
  );
};

export default WordCardBackdrop;

const Container = styled('div')`
  position: relative;
  max-width: 80%;
  max-height: 80%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgb(0 0 0 / 14%);
  background-color: #ffffffd6;
  cursor: pointer;
  overflow-y: auto;
  transition: all 0.2s ease-in-out;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledMarkup = styled(Markup)`
  margin-bottom: 3px;
`;
