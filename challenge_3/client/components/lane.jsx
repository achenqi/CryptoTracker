import React, { useState, useEffect } from 'react';
import PinsSelector from './pins-selector.jsx'
function Lane() {
  const [isMounted, setMounted] = useState(false);
  const [pins, setPins] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [currentPins, setCurrentPins] = useState(10);
  const [totalScore, setTotalScore] = useState(0);
  const [freeFrame, setfreeFrame] = useState(false);
  const [reset, setReset] = useState(false);
  const [scoreBoard, setScoreBoard] = useState({});
  const [scoreHistory, setScoreHistory] = useState([]);
  useEffect(()=> {
    if (isMounted === false) {
      setMounted(true);
      return;
    }
    if (pins === 0) {
      return;
    }
    // if (reset === true) {
    //   setReset(false);
    //   return;
    // }
    if (pins > currentPins) {
      alert('NO');
    } else {
      if (pins === 10) {
        setTotalScore(totalScore + 30);
        setScoreBoard({ 1: 30, 2: 0, score: 30});
        setCurrentTurn(1);
        setPins(0);
      } else {
        console.log('jere')
        setTotalScore(totalScore + pins);
        if (currentTurn === 1) {
          setCurrentTurn(2);
          setCurrentPins(10 - pins);
          setScoreBoard({1: pins})
          setPins(0);
        } else {
          setScoreBoard(prev => ({...prev, 2: pins}));
          setCurrentPins(10);
          setCurrentTurn(1);
          setPins(0);
        }
      }
    }
  },[pins])

  useEffect(() => {
    console.log(scoreBoard);
    if (scoreBoard[1] && scoreBoard[2]) {
      console.log('here');

    }
  }, [scoreBoard])

  return (
    <div>
      This is the lane
      <PinsSelector pinsHit={setPins}/>
      <div>
        Total Score: {totalScore},
        Current Turn: {currentTurn},
      </div>
    </div>
  )
}

export default Lane;