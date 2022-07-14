import GameScore from './GameScore';
import volumeUpIcon from '../../assets/soundIcon.png';
import { GAME_TYPE } from '../../utils/Constants';
import { StyledStack } from './styles';
import { Stack } from '@mui/material';
import Hearts from './Hearts';
import Stars from './Stars';

type Props = {
  type: GAME_TYPE;
  audio: HTMLAudioElement;
  score: number;
  correctAnswersCount: number;
  seconds: number;
  isTimerActive: boolean;
  currentLifeIndex?: number;
};

const GameControls = ({
  type,
  audio,
  score,
  correctAnswersCount,
  seconds,
  isTimerActive,
  currentLifeIndex,
}: Props) => {
  const handleClick = () => {
    audio.play();
  };

  return (
    <StyledStack direction="column" spacing={1}>
      <Stack sx={{ width: '100%' }}>
        <GameScore
          score={score}
          correctAnswersCount={correctAnswersCount}
          isTimerActive={isTimerActive}
          seconds={seconds}
        />

        <Stars correctAnswersCount={correctAnswersCount} />

        {type === GAME_TYPE.AUDIOCALL ? <Hearts count={currentLifeIndex ?? 0} /> : null}
      </Stack>

      <img onClick={handleClick} src={volumeUpIcon} alt="volume up" style={{ cursor: 'pointer' }} />
    </StyledStack>
  );
};

export default GameControls;
