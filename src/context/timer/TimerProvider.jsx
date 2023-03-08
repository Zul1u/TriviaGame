import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import TimerContext from './TimerContext';

export default function TimerProvider({ children }) {
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [stopTimer, setStopTimer] = useState(false);
  const [startTimer, setStartTimer] = useState(true);

  const value = useMemo(
    () => ({
      stopTimer,
      setStopTimer,
      startTimer,
      setStartTimer,
      timerSeconds,
      setTimerSeconds,
    }),
    [stopTimer, startTimer, timerSeconds],
  );

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}

TimerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
