import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [questionData, setQuestionData] = useState([]);
  const [renderButtonNext, setRenderButtonNext] = useState(false);

  const fetchTriviaApi = async () => {
    try {
      const URL = 'https://opentdb.com/api.php?amount=10&category=9';
      const response = await fetch(URL);
      const data = await response.json();
      return setQuestionData(data.results);
    } catch (error) {
      return 'Error fetch Api';
    }
  };

  const value = useMemo(
    () => ({
      fetchTriviaApi,
      questionData,
      setQuestionData,
      renderButtonNext,
      setRenderButtonNext,
    }),
    [questionData, renderButtonNext],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
