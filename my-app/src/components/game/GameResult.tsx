import { GAME_TYPE } from '../../utils/Constants';
import { GameAnswers } from '../sprint/Sprint';

interface GameResultProps {
  isGameFinished: boolean; 
  gameAnswers: GameAnswers[];
  type: GAME_TYPE;
}

const GameResult = (props: GameResultProps) => {
  if (props.isGameFinished) {
    return (
      <div style={{height: '300px', overflowY: 'auto'}}>{props.gameAnswers.map((obj) => {
        return <p key={obj.item.id + props.type}>{`${obj.item.word} ${obj.item.wordTranslate} ${obj.answer} 
            ${obj.successCounter || 0}/${(obj.successCounter || 0) + (obj.failCounter || 0)}`}</p>
      })}</div>
    );
  }
  return <></>;
}

export default GameResult