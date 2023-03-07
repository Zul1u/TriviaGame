import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnswerButton from '../components/AnswerButton';
import Header from '../components/Header';
import Timer from '../components/Timer';
import Context from '../context/Context';
import shuffleAnswers from '../helpers/shuffleAnswers';

export default function Game() {
  const {
    fetchTriviaApi,
    questionData,
    setStopTimer,
    setRenderButtonNext,
    renderButtonNext,
    setStartTimer,
  } = useContext(Context);

  const { id } = useParams();
  const [isCorrectAnswer, setIsCorrectAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const QUESTION = id - 1;

  useEffect(() => {
    const fetchApi = async () => fetchTriviaApi();
    fetchApi();
  }, []);

  useEffect(() => {
    if (questionData.length > 0) {
      setQuestions(questionData.map((question) => shuffleAnswers(question)));
    }
  }, [questionData]);

  const curiosity = questions[QUESTION];

  const handleClick = ({ target: { value } }) => {
    setStopTimer(true);
    setStartTimer(false);
    setDisabled(true);
    setRenderButtonNext(true);

    const isCorrect = curiosity.answers.filter(
      ({ answer }) => answer === value,
    );

    if (isCorrect[0].correct === true) setIsCorrectAnswer(value);
  };

  const handleClickBtnNext = () => {
    setDisabled(false);
    setStartTimer(true);
    setStopTimer(false);
    setRenderButtonNext(false);
    if (id <= questions.length - 1) {
      return navigate(`/game/question/${Number(id) + 1}`);
    }
    return navigate('/scoreboard');
  };

  return (
    <>
      <Header />
      {curiosity && (
        <div>
          <Timer />
          <div className="game-description-container">
            <p className="game-description">{curiosity.question}</p>
          </div>
          <div>
            {curiosity.answers.map(({ answer }) => (
              <AnswerButton
                key={answer}
                answer={answer}
                correct={isCorrectAnswer}
                handleClick={handleClick}
                disabledBtn={disabled}
              />
            ))}
          </div>
          {renderButtonNext && (
            <button type="button" onClick={handleClickBtnNext}>
              NEXT QUESTION
            </button>
          )}
        </div>
      )}
    </>
  );
}
