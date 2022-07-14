import topBanner from '../../assets/gifs/student.png';
import { styled, Typography } from '@mui/material';

const AboutApp = () => {
  return (
    <StyledSection>
      <ImgContainer>
        <StyledImg src={topBanner} alt="student logo" />
      </ImgContainer>

      <TextContainer>
        <StyledTypography variant="h1">Твой помощник в изучении английского языка</StyledTypography>
      </TextContainer>
    </StyledSection>
  );
};

const StyledSection = styled('section')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: calc(100vh - 64px);

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ImgContainer = styled('div')`
  flex: 1 1 50%;
  display: flex;
  align-items: center;
  justify-content: center;
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

export default AboutApp;
