import { Box } from '@mui/material';
import React, { FC } from 'react';
import LevelModal from './LevelModal';
import PopupLevel from './PopupLevel';

interface SprintProps {
  level?: number;
}

const Sprint: FC<SprintProps> = (props) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 64px - 25px - 48px)',
      }}
    >
      <LevelModal></LevelModal>
    </Box>
  );
}

export default Sprint;
