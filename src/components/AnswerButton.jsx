import React from 'react';
import PropTypes from 'prop-types';

export default function AnswerButton({
  answer,
  correct,
  handleClick,
  disabledBtn,
}) {
  return (
    <div className="answer-button-container">
      <button
        type="button"
        className={`${correct === answer ? 'correct' : 'incorrect'}`}
        onClick={(e) => handleClick(e)}
        disabled={disabledBtn}
        value={answer}
      >
        {answer}
      </button>
    </div>
  );
}

AnswerButton.propTypes = {
  answer: PropTypes.string.isRequired,
  correct: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  disabledBtn: PropTypes.bool.isRequired,
};
