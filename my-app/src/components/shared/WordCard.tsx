import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";
import { API_URL } from "../../utils/Constants";

interface WordCardProps {
  word: any;
}

 const WordCard: React.FC<WordCardProps> = ({ word }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardMedia
        component="img"
        height="140"
        image={`${API_URL}/${word.image}`}
        alt="green iguana"
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          {word.word}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {word.transcriprion}
        </Typography>
        <Typography variant="body2">{word.textExample}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default WordCard;
