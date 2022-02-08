import { Box } from '@mui/material';
import React, { FC } from 'react';
import LevelModal from './LevelModal';
import PopupLevel from './PopupLevel';

interface SprintProps {
  level?: number;
}

const Sprint: FC<SprintProps> = (props) => {
  const [level, setLevel] = React.useState(props.level || 0);
  const [modalOpen, setModalOpen] = React.useState(props ? true : false)
  
  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 64px - 25px - 48px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <LevelModal active={modalOpen} setActive={setModalOpen} setLevel={setLevel}></LevelModal>
    </Box>
  );
}

export default Sprint;
