import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CurUser, IUserWord, UserWordItem, WordCardProp, WordItem } from '../../types/types';
import { API_URL, APP_ROUTES, WORD_STATUS } from '../../utils/Constants';
import styles from './WordCard.module.css';
import { Chip } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { useContext, useState } from 'react';
// import { UserContext } from '../../App';
import WordStat from './WordStat';
import OptionalBtns from './OptinalBtns';
// import { getHardWords, getNewToken, getUserId, getUserToken } from '../../services/WordService';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../store/hooks';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface ExpandWordCardProp extends WordCardProp {
  userWords: IUserWord[];
}

export default function WordCard({ word, userWords, onDataChanged }: ExpandWordCardProp) {
  const [expanded, setExpanded] = React.useState(false);

  const difficulty = userWords.find((userWord) => word.id === userWord.wordId)?.difficulty;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function createMarkup() {
    return { __html: word.textMeaning };
  }
  function createExample() {
    return { __html: word.textExample };
  }
  function checkBorder(word: WordItem) {
    let bg;
    switch (word.group) {
      case 0:
        bg = '#82B2ED';
        break;
      case 1:
        bg = '#689BDC';
        break;
      case 2:
        bg = '#295488';
        break;
      case 3:
        bg = '#295488';
        break;
      case 4:
        bg = '#1B2D46';
        break;
      case 5:
        bg = '#141B29';
        break;
    }
    return bg;
  }

  let isPlay = false;
  function togglePlay(word: WordItem) {
    const audioList = [
      new Audio(`${API_URL}/${word.audio}`),
      new Audio(`${API_URL}/${word.audioMeaning}`),
      new Audio(`${API_URL}/${word.audioExample}`),
    ];

    if (!isPlay) {
      audioList[0].play();
      audioList[0].addEventListener('ended', () => audioList[1].play());
      audioList[1].addEventListener('ended', () => audioList[2].play());
      isPlay = true;
    } else {
      audioList.forEach((item) => item.pause());
      isPlay = false;
    }
  }

  // const userContext = useContext<{
  //   user: CurUser;
  //   dispatchUserEvent: (actionType: string, payload: CurUser) => void;
  // }>(UserContext);
  const [userContext, dispatch] = useUserContext();

  const checkBg = () => {
    if (!difficulty) {
      return;
    }

    type Colors = {
      [key in WORD_STATUS]?: string;
    };
    const colors: Colors = {
      [WORD_STATUS.HARD]: '#f77e3d8f',
      [WORD_STATUS.LEARNED]: '#36a33854',
    };

    return colors[difficulty];
  };

  return (
    <Card sx={{ minWidth: 280, backgroundColor: checkBg }}>
      {/* {userContext.user.name ? <WordStat word={word} /> : ''} */}
      {userContext.name ? <WordStat word={word} /> : ''}
      <CardMedia component="img" height="140" image={`${API_URL}/${word.image}`} alt={word.word} />
      <div className={styles.cardContent}>
        <div className={styles.wordTitle} style={{ borderLeft: `8px solid ${checkBorder(word)}` }}>
          <div>
            <h4 className={styles.wordName}> {word.word} </h4>
            <p className={styles.wordsMain}>{word.transcription}</p>
            <p className={styles.wordsMain}>{word.wordTranslate}</p>
          </div>
          <button
            className={styles.soundBtn}
            style={{ border: `3px solid ${checkBorder(word)}` }}
            onClick={() => {
              togglePlay(word);
            }}
          ></button>
        </div>
      </div>
      <CardActions disableSpacing>
        {/* {userContext.user.name ? <OptionalBtns word={word} onDataChanged={onDataChanged} /> : ''} */}
        {userContext.name ? <OptionalBtns word={word} onDataChanged={onDataChanged} /> : ''}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div>
            <h5 className={styles.h5}>Значение слова:</h5>
            <p dangerouslySetInnerHTML={createMarkup()}></p>
            <p>{word.textMeaningTranslate}</p>

            <h5 className={styles.h5}>Пример использования:</h5>
            <p dangerouslySetInnerHTML={createExample()}></p>
            <p>{word.textExampleTranslate}</p>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
