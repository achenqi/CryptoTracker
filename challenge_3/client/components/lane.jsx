import React, { useState, useEffect } from 'react';
import PinsSelector from './pins-selector.jsx';
import Score from './score.jsx';
function Lane() {
  const [isMounted, setMounted] = useState(false);
  const [pins, setPins] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [currentPins, setCurrentPins] = useState(10);
  const [totalScore, setTotalScore] = useState(0);
  const [freeFrame, setfreeFrame] = useState(false);
  const [scoreBoard, setScoreBoard] = useState({});
  const [scoreHistory, setScoreHistory] = useState([]);
  const [extraFrame, setFrame] = useState(false);
  const [turns, setTurns] = useState(1);
  useEffect(()=> {
    if (isMounted === false) {
      setMounted(true);
      return;
    }
    if (pins === 0) {
      return;
    }
    if (pins > currentPins) {
      alert('Not enough pins');
    } else {
      if (pins === 10) {
        setTotalScore(totalScore + 30);
        setScoreBoard({ 1: 30, 2: 'STRIKE', score: 30});
        setCurrentTurn(1);
        setPins(0);
        setTurns(turns + 1);
      } else {

        if (currentTurn === 1) {
          setCurrentTurn(2);
          setCurrentPins(10 - pins);
          if (extraFrame === true) {
            setTotalScore(totalScore + 2 * pins);
            setScoreBoard({1: pins});
            setFrame(false);
          } else {
            setTotalScore(totalScore + pins);
            setScoreBoard({1: pins})
          }
          setPins(0);
        } else {
          setTotalScore(totalScore + pins);
          setScoreBoard(prev => ({...prev, 2: pins}));
          setCurrentPins(10);
          setCurrentTurn(1);
          setPins(0);
          setTurns(turns + 1);
        }
      }
    }
  },[pins])

  useEffect(() => {
    console.log('scoreboard',scoreBoard);
    if (scoreBoard[1] && scoreBoard[2] !== undefined) {
      console.log('here');
      if (scoreBoard[1] === 30 || (scoreBoard[1] + scoreBoard[2] === 10)) {
        setFrame(true);
      }
      setScoreHistory((prev) => ([...scoreHistory, scoreBoard]))
    }
  }, [scoreBoard])

  useEffect(()=> {
    console.log('scorehistory',scoreHistory);
    setScoreBoard({});
  }, [scoreHistory])

  return (
    <div>
      This is the lane
      <div>{(turns >= 11) ? 'Game Over' : 'Turn ' +turns}</div>
      <PinsSelector pinsHit={setPins}/>
      <div>
        Total Score: {totalScore},
        Current Turn: {currentTurn},
      </div>
      <Score score = {scoreHistory}/>
      <div>

      </div>
    </div>
  )
}

export default Lane;