import { styled, Typography, TypographyVariant } from '@mui/material';
import { WordItem } from '../../types/types';

const BIG = 10;

const getVariant = (isBig: boolean): TypographyVariant => {
  return isBig ? 'h4' : 'h3';
};

type Props = {
  question: WordItem;
};

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

const StyledTypography = styled(Typography)`
  max-width: 100vw;
  overflow: auto;
`;

export default GameQuestion;
