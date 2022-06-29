import GameScore from './GameScore';
import volumeUpIcon from '../../../assets/soundIcon.png';
import { GAME_TYPE } from '../../../utils/Constants';
import { StyledStack } from '../Game/styles';

type Props = {
  correctAnswersCount: number;
  isCorrect: boolean;
  type: GAME_TYPE;
  audio: HTMLAudioElement;
  currentLifeIndex?: number;
};

const GameControls = ({ correctAnswersCount, isCorrect, type, audio, currentLifeIndex }: Props) => {
  const handleClick = () => {
    audio.play();
  };

  return (
    <StyledStack direction="column" spacing={1}>
      <GameScore
        correctAnswersCount={correctAnswersCount}
        isCorrect={isCorrect}
        type={type}
        currentLifeIndex={currentLifeIndex}
      />

      <img onClick={handleClick} src={volumeUpIcon} alt="volume up" style={{ cursor: 'pointer' }} />
    </StyledStack>
  );
};

export default GameControls;
