import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnswerButton from '../components/AnswerButton';
import Header from '../components/Header';
import Timer from '../components/Timer';
import Context from '../context/Context';
import {
  updatePlayerQuestion,
  updatePlayerScore,
} from '../helpers/playerInfoStorage';
import shuffleAnswers from '../helpers/shuffleAnswers';
import sumPlayerScore from '../helpers/sumPlayerScore';

export default function Game() {
  const {
    fetchTriviaApi,
    questionData,
    setStopTimer,
    setRenderButtonNext,
    renderButtonNext,
    setStartTimer,
    timerSeconds,
  } = useContext(Context);

  const { id } = useParams();
  const [isCorrectAnswer, setIsCorrectAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const QUESTION = id - 1;
  const NEXT_QUESTION = id <= questions.length - 1;
  const NEXT_ID = Number(id) + 1;

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
    const ANSWER_CORRECT = curiosity.answers.filter(
      ({ correct }) => correct === true,
    );

    setStopTimer(true);
    setStartTimer(false);
    setDisabled(true);
    setRenderButtonNext(true);
    setIsCorrectAnswer(ANSWER_CORRECT[0].answer);

    const isCorrect = curiosity.answers.filter(
      ({ answer }) => answer === value,
    );

    if (isCorrect[0].correct === true) {
      const score = sumPlayerScore(curiosity.difficulty, timerSeconds);
      updatePlayerScore(score);
    }
  };

  const handleClickBtnNext = () => {
    setDisabled(false);
    setStartTimer(true);
    setStopTimer(false);
    setRenderButtonNext(false);
    updatePlayerQuestion(NEXT_ID);
    if (NEXT_QUESTION) {
      return navigate(`/game/question/${NEXT_ID}`);
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
            <div className="button-next">
              <button type="button" onClick={handleClickBtnNext}>
                {NEXT_QUESTION ? 'NEXT QUESTION' : 'Scoreboard'}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
