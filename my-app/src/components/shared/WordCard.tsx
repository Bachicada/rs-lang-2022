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

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: '#1B2D46' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${API_URL}/${word.image}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="whitesmoke">
            {word.word}
          </Typography>
          <Typography variant="body2" color="whitesmoke" >
           {word.transcription}
          </Typography>
          <Typography variant="body2" color="whitesmoke">
           {word.wordTranslate}
          </Typography>
          <Typography variant="body2" color="whitesmoke">
          {word.textMeaning}
          </Typography>
        </CardContent>
      </CardActionArea>
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

