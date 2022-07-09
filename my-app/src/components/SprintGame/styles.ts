import { Box, Container, styled } from '@mui/material';

export const StyledBox = styled(Box)`
  width: 100%;
  min-height: calc(100vh - 64px - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 400px;
  border-radius: 5px;
`;
