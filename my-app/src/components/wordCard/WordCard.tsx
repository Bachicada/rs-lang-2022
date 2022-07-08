import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CurUser, IUserWord, UserWordItem, WordCardProp, WordItem } from '../../types/types';
import { API_URL, APP_ROUTES, CARD_COLORS, WORD_STATUS } from '../../utils/Constants';
import styles from './WordCard.module.css';
import { Button, Chip, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { MutableRefObject, RefObject, useContext, useEffect, useState } from 'react';
// import { UserContext } from '../../App';
import OptionalBtns from './OptinalBtns';
// import { getHardWords, getNewToken, getUserId, getUserToken } from '../../services/WordService';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../store/hooks';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import WordCardBackdrop from './WordCardBackdrop';
import useGetWordAudio from '../../hooks/useGetWordAudio';

interface ExpandWordCardProp extends WordCardProp {
  userWords: IUserWord[];
  isUser: boolean;
}

export default function WordCard({ word, userWords, isUser, onDataChanged }: ExpandWordCardProp) {
  const [isOpen, setIsOpen] = useState(false);

  const userWord = userWords.find((userWord) => word.id === userWord.wordId);

  const {
    difficulty,
    optional: { failCounter, successCounter },
  } = userWord || { optional: { failCounter: 0, successCounter: 0 } };

  const { isPlay, switchPlay } = useGetWordAudio({ word });

  // useEffect(() => {
  //   if (!isPlay) {
  //     return;
  //   }

  //   audioRef.current = stopAudio;
  // }, [isPlay, stopAudio]);

  // function togglePlay(word: WordItem) {
  //   const audioList = [
  //     new Audio(`${API_URL}/${word.audio}`),
  //     new Audio(`${API_URL}/${word.audioMeaning}`),
  //     new Audio(`${API_URL}/${word.audioExample}`),
  //   ];

  //   if (!isPlay) {
  //     audioList[0].play();
  //     audioList[0].addEventListener('ended', () => audioList[1].play());
  //     audioList[1].addEventListener('ended', () => audioList[2].play());
  //     setIsPlay(true);
  //   } else {
  //     audioList.forEach((item) => item.pause());
  //     setIsPlay(true);
  //   }
  // }

  const checkBg = () => {
    if (!difficulty) {
      return;
    }

    return CARD_COLORS[difficulty];
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Card sx={{ minWidth: 280, borderRadius: '12px', backgroundColor: checkBg }}>
        <CardMedia
          component="img"
          height="160"
          image={`${API_URL}/${word.image}`}
          alt={word.word}
        />

        <CardContent sx={{ position: 'relative' }}>
          <Typography>{word.word}</Typography>
          <Typography sx={{ fontFamily: 'Roboto' }}>{word.transcription}</Typography>
          <Typography>{word.wordTranslate}</Typography>

          <StyledIconButton
            color="secondary"
            aria-label="listen translate"
            onClick={() => switchPlay()}
          >
            {!isPlay ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </StyledIconButton>
        </CardContent>

        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Button color="secondary" variant="outlined" size="small" onClick={handleOpen}>
            Описание
          </Button>
          {isUser ? <OptionalBtns word={word} onDataChanged={onDataChanged} /> : null}
        </CardActions>
      </Card>

      <WordCardBackdrop
        word={word}
        successCounter={successCounter}
        failCounter={failCounter}
        isOpen={isOpen}
        handleClose={handleClose}
      />
    </>
  );
}

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 12px;
  right: 8px;
`;
