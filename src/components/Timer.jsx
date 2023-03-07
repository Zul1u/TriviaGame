import { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

export default function Timer() {
  const [seconds, setSeconds] = useState(30);
  const [timerId, setTimerId] = useState(0);
  const { stopTimer, setRenderButtonNext, startTimer } = useContext(Context);

  useEffect(() => {
    if (startTimer) {
      if (seconds !== 30) setSeconds(30);
      const newIntervalId = setInterval(() => {
        setSeconds((pvState) => pvState - 1);
      }, 1000);
      setTimerId(newIntervalId);
    }
  }, [startTimer]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(timerId);
      setRenderButtonNext(true);
    } else if (stopTimer) {
      clearInterval(timerId);
    }
  }, [seconds, stopTimer]);

  return <div>{seconds}</div>;
}
