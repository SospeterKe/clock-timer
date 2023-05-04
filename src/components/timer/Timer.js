import React, { useState, useEffect, useRef } from 'react';

export default function Timer({ start, time, pause, breakValue, isSession, isRunning, setIsSession, setIsRunning, displayMode, setDisplayMode }) {
  // Set initial state for time left in seconds
  const [timeLeft, setTimeLeft] = useState(time * 60);
  const audioRef = useRef(null);

  // Set up effect to handle timer countdown
  useEffect(() => {                                    
    let timer;
    setIsRunning(true);

    // If timer is running and time left is greater than 0, set up interval to decrement timeLeft every second
    if (start && isRunning && timeLeft >= 0 && !pause) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }else if (timeLeft === -1) {
      // If timeLeft is -1, switch between session and break modes
      setIsSession((prevSession) => !prevSession);
      setDisplayMode(isSession ? "Break" : "Session")
      setTimeLeft(isSession ? breakValue * 60 : time * 60);
    }

    if(timeLeft === 1){
      audioRef.current.play();
    } 

    // Clean up interval when effect is unmounted
    return () => clearInterval(timer);
  }, [start, timeLeft, pause, isRunning, isSession, breakValue, displayMode, audioRef]);

  // Set up effect to handle resetting timeLeft when start is toggled off
  useEffect(() => {
    if (!start) {
      setTimeLeft(time * 60);
    }
  }, [start, time])

  // Calculate minutes and seconds from timeLeft
  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  // Render time display
  return (
    <div>
      {minutes}:{seconds}
      <audio id="beep" ref={audioRef} src="https://www.freesoundslibrary.com/wp-content/uploads/2021/07/airplane-ding-dong-sound-effect.mp3" />    
    </div>
  );
}
