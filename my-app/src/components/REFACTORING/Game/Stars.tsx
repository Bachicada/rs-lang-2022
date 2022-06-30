import React from 'react';
import { StarsWrapper, StyledStar } from './styles';

type Props = {
  correctAnswersCount: number;
};

const stars = ['⭐', '⭐', '⭐', '⭐'];

const Stars = ({ correctAnswersCount }: Props) => {
  return (
    <StarsWrapper>
      {stars.map((item, idx) => {
        const isCorrect = correctAnswersCount > idx;

        return (
          <StyledStar key={idx} isCorrect={isCorrect}>
            {item}
          </StyledStar>
        );
      })}
    </StarsWrapper>
  );
};

export default Stars;
