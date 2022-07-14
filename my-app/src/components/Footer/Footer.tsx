import React from 'react';
import { Stack, styled, Typography } from '@mui/material';

export function Footer() {
  return (
    <StyledFooter>
      <StyledItem>
        <Typography>
          Illustrations from{' '}
          <StyledLink href="https://icons8.com/illustrations/author/eEbrZFlkyZbD">Ouch!</StyledLink>
        </Typography>
      </StyledItem>

      <StyledItem>
        <Typography textAlign="center">2022</Typography>
      </StyledItem>

      <StyledItem>
        <Stack direction="column" sx={{ textAlign: 'right' }}>
          <StyledLink href="https://github.com/timursk" target="_blank" rel="noreferrer">
            <Typography>timursk</Typography>
          </StyledLink>

          <StyledLink href="https://github.com/Bachicada" target="_blank" rel="noreferrer">
            <Typography>bachicada</Typography>
          </StyledLink>
        </Stack>
      </StyledItem>
    </StyledFooter>
  );
}

const StyledFooter = styled('footer')`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 16px;
`;

const StyledItem = styled('div')`
  flex-basis: 33.333333%;
`;

const StyledLink = styled('a')`
  text-decoration: underline;
`;
