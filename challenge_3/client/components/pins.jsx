import React from 'react';

function Pins (props) {
  return (
  <th onClick={() => props.pinsHit(props.number)}>{props.number}</th>
  )
}

export default Pins;