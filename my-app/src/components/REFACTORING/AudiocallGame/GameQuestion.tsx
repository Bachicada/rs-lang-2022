import { styled, Typography, TypographyVariant } from '@mui/material';
import { WordItem } from '../../../types/types';

type Props = {
  question: WordItem;
};

const BIG = 10;

const getVariant = (isBig: boolean): TypographyVariant => {
  return isBig ? 'h4' : 'h3';
};

const StyledTypography = styled(Typography)`
  max-width: 100vw;
  overflow: auto;
`;

const GameQuestion = ({ question }: Props) => {
  const questionWord = question.word || '';
  const isBigQuestion = questionWord.length >= BIG;
  const variant = getVariant(isBigQuestion);

  return (
    <>
      <StyledTypography variant={variant} color="primary">
        {questionWord}
      </StyledTypography>
    </>
  );
};

export default GameQuestion;
