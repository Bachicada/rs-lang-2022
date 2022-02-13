import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { API_URL } from '../../utils/Constants';
import { WordCardProp, WordItem } from '../../types';

export default function WordCard (props: WordCardProp) {
  const word = props.word;
  function createMarkup(){
    return { __html: word.textMeaning };
  }
  
  function checkBg(word: WordItem){

    let bg;
    if(word.group === 0){
      bg = '#82B2ED'
    }
    else{
      bg = '#689BDC'
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
    <Card sx={{ maxWidth: 345, backgroundColor: `${checkBg(word)}`}} >
      <div onClick={(event)=>{playSound(word, event)}}>
        <CardMedia
          component="img"
          height="140"
          image={`${API_URL}/${word.image}`}
          alt="green iguana"
        />
        <CardContent>
          
          <button>Play</button>
          <Typography gutterBottom variant="h5" component="div" color="whitesmoke">
            {word.word}
          </Typography>
          <Typography variant="body2" color="whitesmoke" >
           {word.transcription}
          </Typography>
          <Typography variant="body2" color="whitesmoke">
           {word.wordTranslate}
          </Typography>
          <Typography  dangerouslySetInnerHTML={createMarkup()} variant="body2" color="whitesmoke" >
          </Typography>
        </CardContent>
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

