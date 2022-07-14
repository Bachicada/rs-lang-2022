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

  border-radius: 10px;
  box-shadow: 5px 5px 5px rgb(0 0 0 / 14%);
  background-color: #ffffffd6;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 20px;
  min-height: 450px;
`;
