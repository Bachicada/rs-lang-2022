/*import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { API_URL } from '../../utils/Constants';
import { WordCardProp, WordItem } from '../../types';
import styles from './WordCard.module.css'

export default function WordCard (props: WordCardProp) {
  const word = props.word;
  function createMarkup(){
    return { __html: word.textMeaning };
  }
  function createExample(){
    return { __html: word.textExample};
  }

  function checkBg(word: WordItem){
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

  function playSound(word: WordItem, event: React.SyntheticEvent){
    const audioList = [
      new Audio(`${API_URL}/${word.audio}`),
      new Audio(`${API_URL}/${word.audioMeaning}`),
      new Audio(`${API_URL}/${word.audioExample}`)
    ]
    if ((event.target as HTMLElement).closest('button')){
       audioList[0].play();
       audioList[0].addEventListener('ended', ()=>audioList[1].play());
       audioList[1].addEventListener('ended', ()=>audioList[2].play());
    }
     else {
      audioList.forEach(item=>item.pause())
     }
  }
 
  return (
    <Card sx={{ minWidth: 345}} >
      <div onClick={(event) => { playSound(word, event); } }
        style={{ padding: `10px` }}
      >
        <CardMedia
          component="img"
          height="140"
          image={`${API_URL}/${word.image}`}
          alt={word.word}/>
        <div className={styles.cardContent}>
          <div className={styles.wordTitle} style={{borderLeft: `8px solid ${checkBg(word)}`}}> 
             <div>
                <h4 className={styles.wordName}> {word.word} </h4>
                <p className={styles.wordsMain}>{word.transcription}</p>
                <p className={styles.wordsMain}>{word.wordTranslate}</p>
             </div>
             <button className={styles.soundBtn} style={{border: `3px solid ${checkBg(word)}`}}></button>
          </div>

          <div>
            <h5>Значение слова:</h5>
            <p dangerouslySetInnerHTML={createMarkup()}></p>
            <p>{word.textMeaningTranslate}</p>

            <h5>Пример использования:</h5>
            <p dangerouslySetInnerHTML={createExample()}></p>
            <p>{word.textExampleTranslate}</p>
          </div>
          
        </div>
      </div>
      <CardActions>
          <Button size="small" color="primary">
            Сложное
          </Button>
          <Button size="small" color="primary">
            Изученное
          </Button>
        </CardActions>
    </Card>
  );
}
*/
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { WordCardProp, WordItem } from '../../types';
import { API_URL } from '../../utils/Constants';
import styles from './WordCard.module.css'
import { Chip } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

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

export default function WordCard(props: WordCardProp) {
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const word = props.word;

  function createMarkup(){
    return { __html: word.textMeaning };
  }
  function createExample(){
    return { __html: word.textExample};
  }
  function checkBg(word: WordItem){
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
   function playSound(word: WordItem, event: React.SyntheticEvent){
    const audioList = [
      new Audio(`${API_URL}/${word.audio}`),
      new Audio(`${API_URL}/${word.audioMeaning}`),
      new Audio(`${API_URL}/${word.audioExample}`)
    ]
    if ((event.target as HTMLElement).closest('button')){
       audioList[0].play();
       audioList[0].addEventListener('ended', ()=>audioList[1].play());
       audioList[1].addEventListener('ended', ()=>audioList[2].play());
    }
     else {
      audioList.forEach(item=>item.pause())
     }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
       <CardMedia
          component="img"
          height="140"
          image={`${API_URL}/${word.image}`}
          alt={word.word}/>
         <div className={styles.cardContent}>
          <div className={styles.wordTitle} style={{borderLeft: `8px solid ${checkBg(word)}`}}> 
             <div>
                <h4 className={styles.wordName}> {word.word} </h4>
                <p className={styles.wordsMain}>{word.transcription}</p>
                <p className={styles.wordsMain}>{word.wordTranslate}</p>
             </div>
             <button className={styles.soundBtn} style={{border: `3px solid ${checkBg(word)}`}}
                     onClick={(event) => { playSound(word, event); } }
             >
            </button>
          </div>    
        </div>
      
     
      <CardActions disableSpacing>
        
        <Chip label="Сложное" deleteIcon={<DoneIcon />}></Chip>
        <Chip label='Изученное' deleteIcon={<DoneIcon />}></Chip>
        
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