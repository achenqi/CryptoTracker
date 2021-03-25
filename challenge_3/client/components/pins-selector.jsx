import React, { useState } from 'react';
import Pins from './pins.jsx';
function PinsSelector(props) {
  const firstRow = [1,2,3].map ((number) => {
    <Pins pinsHit={props.pinsHit} number={number}/>
  })
  return (
    <div>
      <table>
        <tbody>
          <tr>
            {[1,2,3].map ((num, key) => {
              return <Pins pinsHit={props.pinsHit} number={num} key = {key}/>
            })}
          </tr>
          <tr>
            {[4,5,6].map ((num, key) => {
              return <Pins pinsHit={props.pinsHit} number={num} key = {key}/>
            })}
          </tr>
          <tr>
            {[7,8,9].map ((num, key) => {
              return <Pins pinsHit={props.pinsHit} number={num} key = {key}/>
            })}
          </tr>
          <tr>
            <th></th>
            <Pins pinsHit={props.pinsHit} number={10}/>
            <th></th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PinsSelector;