import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [questionData, setQuestionData] = useState([]);
  const [stopTimer, setStopTimer] = useState(false);
  const [renderButtonNext, setRenderButtonNext] = useState(false);
  const [startTimer, setStartTimer] = useState(true);

  const fetchTriviaApi = async () => {
    const URL = 'https://opentdb.com/api.php?amount=10&category=9';
    const response = await fetch(URL);
    const data = await response.json();
    setQuestionData(data.results);
  };

  const value = useMemo(
    () => ({
      fetchTriviaApi,
      questionData,
      stopTimer,
      setStopTimer,
      renderButtonNext,
      setRenderButtonNext,
      startTimer,
      setStartTimer,
    }),
    [questionData, stopTimer, renderButtonNext, startTimer],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};