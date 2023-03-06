import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [answers, setAnswers] = useState([]);

  const fetchTriviaApi = async () => {
    const URL = 'https://opentdb.com/api.php?amount=10&category=9';
    const response = await fetch(URL);
    const data = await response.json();
    setAnswers(data.results);
  };

  const value = useMemo(
    () => ({
      fetchTriviaApi,
      answers,
    }),
    [answers],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
