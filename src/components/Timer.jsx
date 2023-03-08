import { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

export default function Timer() {
  const [timerId, setTimerId] = useState(0);
  const {
    stopTimer,
    setRenderButtonNext,
    startTimer,
    timerSeconds,
    setTimerSeconds,
  } = useContext(Context);

  useEffect(() => {
    if (startTimer) {
      if (timerSeconds !== 30) setTimerSeconds(30);
      const newIntervalId = setInterval(() => {
        setTimerSeconds((pvState) => pvState - 1);
      }, 1000);
      setTimerId(newIntervalId);
    }
  }, [startTimer]);

  useEffect(() => {
    if (timerSeconds === 0) {
      clearInterval(timerId);
      setRenderButtonNext(true);
    } else if (stopTimer) {
      clearInterval(timerId);
    }
  }, [timerSeconds, stopTimer]);

  return (
    <div className="timer-container">
      <span>{timerSeconds}</span>
    </div>
  );
}
