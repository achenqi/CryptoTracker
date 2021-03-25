import React from 'react';

function Score(props){
  return (
    props.score.map((turn, key) => <div className='score-turn' key={key}>{turn[1]} | {turn[2]} {(turn[1] + turn[2] === 10) ? '| SPARE' : ''}</div>)
  )
}

export default Score;