import { styled, Typography, TypographyVariant } from '@mui/material';

type Props = {
  question: any;
  item: any;
};

const BIG = 10;

const getVariant = (isBig: boolean): TypographyVariant => {
  return isBig ? 'h4' : 'h3';
};

const StyledTypography = styled(Typography)`
  max-width: 100vw;
  overflow: auto;
`;

const GameQuestion = ({ question, item }: Props) => {
  const questionWord = item.word;
  const questionAnswer = question.correct ? item.wordTranslate : question.incorrect;

  const isBigQuestion = questionWord.length >= BIG;
  const isBigAnswer = questionAnswer.length >= BIG;

  return (
    <>
      <StyledTypography variant={getVariant(isBigQuestion)} color="primary">
        {questionWord}
      </StyledTypography>

      <StyledTypography variant={getVariant(isBigAnswer)}>{questionAnswer}</StyledTypography>
    </>
  );
};

export default GameQuestion;
