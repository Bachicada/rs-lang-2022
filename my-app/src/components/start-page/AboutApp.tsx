import * as React from 'react';
import styles from './landing.module.css';
// import topBanner from '../../assets/creative_minds.png';
import topBanner from '../../assets/gifs/student.png';
// import logoImg from '../../assets/rs-logo1.svg';
import logoImg from '../../assets/rslang-logo.png';
import { styled, Typography } from '@mui/material';
// import styled from '@emotion/styled';

const StyledSection = styled('section')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ImgContainer = styled('div')`
  flex: 1 1 50%;
`;

const StyledImg = styled('img')`
  width: 100%;
`;

const TextContainer = styled('div')`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: right;
`;

const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '3.75rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '6rem',
  },
}));

export class AboutApp extends React.Component {
  render() {
    return (
      <StyledSection>
        <ImgContainer>
          <StyledImg src={topBanner} alt="student logo" />
        </ImgContainer>
        <TextContainer>
          <StyledTypography variant="h1">
            Твой помощник в изучении английского языка
          </StyledTypography>
        </TextContainer>
      </StyledSection>
    );
  }
}
