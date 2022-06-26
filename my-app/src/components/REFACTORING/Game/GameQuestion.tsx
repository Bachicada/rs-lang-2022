import { Typography, TypographyVariant } from '@mui/material';

type Props = {
  question: any;
  item: any;
};

const BIG = 14;

const getVariant = (isBig: boolean): TypographyVariant => {
  return isBig ? 'h3' : 'h4';
};

const GameQuestion = ({ question, item }: Props) => {
  const questionWord = item.word;
  const questionAnswer = question.correct ? item.wordTranslate : question.incorrect;

  const isBigQuestion = questionWord.length > BIG;
  const isBigAnswer = questionAnswer.length > BIG;

  return (
    <>
      <Typography variant={getVariant(isBigQuestion)} color="primary">
        {questionWord}
      </Typography>

      <Typography variant={getVariant(isBigAnswer)}>{questionAnswer}</Typography>
    </>
  );
};

export default GameQuestion;
