import { Stack } from '@mui/material';
import React from 'react';
import GameScore from '../../game/GameScore';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { GAME_TYPE } from '../../../utils/Constants';

type Props = {
  correctAnswersCount: number;
  isCorrect: boolean;
  type: GAME_TYPE;
  audio: HTMLAudioElement;
};

const GameControls = ({ correctAnswersCount, isCorrect, type, audio }: Props) => {
  return (
    <Stack
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
      }}
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1}
    >
      <GameScore correctAnswersCount={correctAnswersCount} isCorrect={isCorrect} type={type} />

      <VolumeUpIcon
        style={{ marginTop: '10px', width: '50px', height: '50px', cursor: 'pointer' }}
        onClick={() => {
          audio.play();
        }}
      />
    </Stack>
  );
};

export default GameControls;
