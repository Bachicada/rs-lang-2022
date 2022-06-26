import GameScore from '../../game/GameScore';
import volumeUpIcon from '../../../assets/soundIcon.png';
import { GAME_TYPE } from '../../../utils/Constants';
import { StyledStack } from './styles';

type Props = {
  correctAnswersCount: number;
  isCorrect: boolean;
  type: GAME_TYPE;
  audio: HTMLAudioElement;
};

const GameControls = ({ correctAnswersCount, isCorrect, type, audio }: Props) => {
  const handleClick = () => {
    audio.play();
  };

  return (
    <StyledStack direction="column" spacing={1}>
      <GameScore correctAnswersCount={correctAnswersCount} isCorrect={isCorrect} type={type} />

      <img onClick={handleClick} src={volumeUpIcon} alt="volume up" style={{ cursor: 'pointer' }} />
    </StyledStack>
  );
};

export default GameControls;
