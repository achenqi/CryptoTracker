import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  update,
  mapCount
} from './mapSlice';
import styles from './Map.module.css';
export function Map() {
  const currentMap = useSelector(mapCount);
  const dispatch = useDispatch();
  console.log('Current Map', currentMap);
  var mines = 10;
  const [gameOver, setGameOver] = useState(false);
  // dispatch(update([[{val:1},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}]]));

  return (
    <div>
      <table>
        <tbody>
        {currentMap.map((rows, key1) => {
          return <tr>{rows.map((value, key2) => (<th onClick={() => {
            if (value.clicked === true) {
              return;
            } else {
              dispatch(update([key1,key2]))
            }
          }}>{(value.clicked === true) ? ((value.val === 1) ? 'X' : (value.mines || value.val)) : ''}</th>))}</tr>
        })}
        </tbody>
      </table>
    </div>
  );
}
