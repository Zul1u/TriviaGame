import { useEffect, useState } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(30);
  const [interval, setIntervals] = useState(null);

  useEffect(() => {
    if (seconds === 0) setSeconds(30);
    setIntervals(
      setInterval(() => {
        setSeconds((pvState) => pvState - 1);
      }, 1000),
    );
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(interval);
    }
  }, [seconds]);

  return <div>{seconds}</div>;
}
