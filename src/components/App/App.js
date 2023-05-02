import { useState } from 'react';
import './App.css';
import { FaArrowUp, FaArrowDown, FaPlay, FaUndo, FaGripLinesVertical } from "react-icons/fa";
import Timer from '../timer/Timer';

function App() {

  const [breakValue, setBreakValue] = useState(5);
  const [sessionValue, setSessionValue] = useState(25);
  const [start, setStart] = useState(false);
  const [paused, setPaused] = useState(false);
  

  const startTimer = () => {
    setStart(prevStart => !prevStart);
    setPaused(false);
  }

  const handlePauseResumeClick = () => {
    setPaused((prevPaused) => !prevPaused);
  }

  const handleBreakIncrement = () => {
    if(breakValue < 60)
      setBreakValue(breakValue + 1);
  }
  const handleBreakDecrement = () => {
    if(breakValue > 0)
     setBreakValue(breakValue - 1);
  }

  const handleSessionIncrement = () => {
    if(sessionValue < 60)
      setSessionValue(sessionValue + 1);
  }
  const handleSessionDecrement = () => {
    if(sessionValue > 0)
     setSessionValue(sessionValue - 1);
  }

  const reset = () => {
    setBreakValue(5);
    setSessionValue(25);
  }


  return (
    <div className="App">
      <p className='header'>25 + 5 Clock</p>
      <div className='time-display'>
        <label id="break-label">
          <p>Break Length</p>
          <div className='controls'>
            <button id="break-decrement" onClick={handleBreakDecrement}>
              < FaArrowDown className='icon'/>
            </button>
            <p id="break-length">{breakValue}</p>
            <button id="break-increment" onClick={handleBreakIncrement}>
              < FaArrowUp className='icon'/>
            </button>
          </div>
        </label>

        <label id="session-label">
          <p>Session Length</p>
          <div className='controls'>
            <button id="session-decrement" onClick={handleSessionDecrement}>
              < FaArrowDown className='icon'/>
            </button>
            <p id="session-length">{sessionValue}</p>
            <button id="session-increment" onClick={handleSessionIncrement} >
              < FaArrowUp className='icon'/>
            </button>
          </div>
        </label>
      </div>

        <label id="timer-label">
          <p>Session</p>
          <p id="time-left"><Timer  start={start} time={sessionValue} pause={paused}/></p>
        </label>
        <div className='controls play-controls'>
          <button id="start_stop">< FaPlay className='icon play-icon' onClick={startTimer}/></button>
          <button id="pause">< FaGripLinesVertical className='icon play-icon' onClick={handlePauseResumeClick}/></button>
          <button id="reset">< FaUndo className='icon play-icon' onClick={reset} /></button>
        </div>
        <p className='credits'>Designed and Coded by <br/>TechSavvySos</p>
    </div>
  );
}

export default App;
