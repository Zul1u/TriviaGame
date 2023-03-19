import React from 'react';
import Header from '../components/Header';

export default function Instructions() {
  return (
    <>
      <Header title="How To PLay" />
      <article className="game-description-container">
        <p className="game-description">
          The Trivia Game is a question-and-answer game about general knowledge. For each
          correct answer, the player earns a certain amount of points that vary according
          to the time taken to answer the question and its difficulty level. After
          answering all the questions, the player is directed to a screen that displays a
          scoreboard ranked in descending order of scores from every time the game was
          played.
        </p>
      </article>
      <section>
        <h3 className="instruction-subtitle">
          To determine the difficulty of the question, simply check the color of the
          timer.
        </h3>
        <div className="difficulty-card">
          <p className="timer-example difficulty-hard">30</p>
          <div>
            <p className="difficulty-description">
              Difficulty:
              <span className="difficulty-hard"> hard</span>
            </p>
            <p className="scoring-calculation-description">
              Scoring calculation:
              <span className="difficulty-hard"> 3 x </span>
              <span className="instruction-parentheses">(</span>
              <span className="instruction-timer-value">timer value</span>
              <span className="instruction-parentheses">)</span>
            </p>
          </div>
        </div>

        <div className="difficulty-card">
          <p className="timer-example difficulty-medium">29</p>
          <div>
            <p className="difficulty-description">
              Difficulty:
              <span className="difficulty-medium"> medium</span>
            </p>
            <p className="scoring-calculation-description">
              Scoring calculation:
              <span className="difficulty-medium"> 2 x </span>
              <span className="instruction-parentheses">(</span>
              <span className="instruction-timer-value">timer value</span>
              <span className="instruction-parentheses">)</span>
            </p>
          </div>
        </div>

        <div className="difficulty-card">
          <p className="timer-example difficulty-easy">28</p>
          <div>
            <p className="difficulty-description">
              Difficulty:
              <span className="difficulty-easy"> easy</span>
            </p>
            <p className="scoring-calculation-description">
              Scoring calculation:
              <span className="difficulty-easy"> 1 x </span>
              <span className="instruction-parentheses">(</span>
              <span className="instruction-timer-value">timer value</span>
              <span className="instruction-parentheses">)</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
