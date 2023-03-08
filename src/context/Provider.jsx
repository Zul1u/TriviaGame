import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [questionData, setQuestionData] = useState([
    {
      category: 'General Knowledge',
      correct_answer: 'Genesis',
      difficulty: 'easy',
      incorrect_answers: ['Exodus', 'Leviticus', 'Numbers'],
      question: 'What is the first book of the Old Testament?',
      type: 'multiple',
    },
  ]);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [stopTimer, setStopTimer] = useState(false);
  const [renderButtonNext, setRenderButtonNext] = useState(false);
  const [startTimer, setStartTimer] = useState(true);

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
      stopTimer,
      setStopTimer,
      renderButtonNext,
      setRenderButtonNext,
      startTimer,
      setStartTimer,
      timerSeconds,
      setTimerSeconds,
    }),
    [questionData, stopTimer, renderButtonNext, startTimer, timerSeconds],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
