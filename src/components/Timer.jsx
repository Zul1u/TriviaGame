import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import TimerContext from '../context/timer/TimerContext';

export default function Timer({ disabledBtn, correctAnswer }) {
  const [timerId, setTimerId] = useState(0);
  const { setRenderButtonNext } = useContext(Context);

  const {
    stopTimer,
    startTimer,
    timerSeconds,
    setTimerSeconds,
    setStartTimer,
  } = useContext(TimerContext);

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
      setStartTimer(false);
      setRenderButtonNext(true);
      disabledBtn(true);
      correctAnswer();
    } else if (stopTimer) {
      clearInterval(timerId);
    }
  }, [timerSeconds, stopTimer]);

  return (
    <div className="timer-container" data-testid="timer-component">
      <span>{timerSeconds}</span>
    </div>
  );
}

Timer.propTypes = {
  disabledBtn: PropTypes.func.isRequired,
  correctAnswer: PropTypes.func.isRequired,
};
