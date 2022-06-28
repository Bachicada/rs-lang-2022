import { useContext } from 'react';
import { useAudiocallContext } from '../../store/hooks';
import { GAME_TYPE } from '../../utils/Constants';

interface GameResultProps {
  type: GAME_TYPE;
}

const GameResult = (props: GameResultProps) => {
  const [quizState, dispatch] = useAudiocallContext();
  if (quizState.isGameFinished) {
    return (
      <div style={{ height: '300px', overflowY: 'auto' }}>
        {quizState.answers.map((obj) => {
          return (
            <p key={obj.item.id + props.type}>{`${obj.item.word} ${obj.item.wordTranslate} ${
              obj.answer
            } 
            ${obj.successCounter}/${(obj.successCounter ?? 0) + (obj.failCounter ?? 0)}`}</p>
          );
        })}
      </div>
    );
  }
  return <></>;
};

export default GameResult;
