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
  console.log('asdasd', currentMap);
  return (
    <div>
      {currentMap.map((rows) => {
        return <tr>{rows.map((value) => (<th></th>))}</tr>
      })}
    </div>
  );
}
