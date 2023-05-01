import React, { useState, useEffect } from 'react';

export default function Timer({start ,time}) {
  const [timeLeft, setTimeLeft] = useState(time * 60);

  useEffect(() => {
    let timer;
    timer = setInterval(() => {
      if(start && timeLeft > 0)  
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [start,timeLeft]);

  useEffect(() => {
    if(!start) {
        setTimeLeft(time * 60);
    }
  }, [start, time])

  const minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return (
    <div>{minutes}:{seconds}</div>
  );
}