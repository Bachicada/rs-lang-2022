import React from 'react'

interface GameLifeProps {
  count: number;
}

const GameLife = (props: GameLifeProps) => {
  const emoji = ['🧡', '💔'];
  const data = [];
  for (let i = 0; i < 5; i++) {
    (i < (props.count)) ? data.push(emoji[0]) : data.push(emoji[1]);
  }
  return (
    <div style={{position: 'absolute', top: '0', left: '0'}}
    >{data}</div>
  )
}

export default GameLife