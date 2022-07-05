import * as React from 'react';
import GamesMenu from './GamesMenu';
import PartOfTextBook from './PartOfTextbook';
import TextbookPartsMenu from './TextbookPartsMenu';
import { styled } from '@mui/material';

export default function Textbook() {
  return (
    <Container>
      <StyledWrapper>
        <GamesMenu />
        <TextbookPartsMenu />
      </StyledWrapper>

      <PartOfTextBook />
    </Container>
  );
}

const Container = styled('div')`
  padding-top: 15px;
`;

const StyledWrapper = styled('div')`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin-bottom: 15px;
  border-radius: 15px;
  background-color: #ffffffd6;
  box-shadow: 5px 5px 5px rgb(0 0 0 / 14%);
  transition: all 0.2s ease-in-out;

  & div:not(:last-child) {
    border-right: 1px solid #d3d3d34d;
  }
`;
