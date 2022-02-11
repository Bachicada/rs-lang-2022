import React from 'react'
import { GameAnswers } from './Sprint';

interface SprintResultsProps {
  isGameFinished: boolean; 
  gameAnswers: GameAnswers[];
}

const SprintResults = (props: SprintResultsProps) => {
  if (props.isGameFinished) {
    return (
      <div style={{height: '300px', overflowY: 'auto'}}>{props.gameAnswers.map((obj) => {
        return <p key={obj.item.id}>{`${obj.item.word} ${obj.item.wordTranslate} ${obj.answer}`}</p>
      })}</div>
    );
  }
  return <></>;
}

export default SprintResults