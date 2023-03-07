function shuffle(array) {
  // https://javascript.info/task/shuffle
  return array.sort(() => Math.random() - 0.5);
}

function shuffleAnswers({
  correct_answer: correct,
  incorrect_answers: incorrects,
  difficulty,
  question,
}) {
  const a = incorrects.map((answer) => ({
    answer,
    correct: false,
  }));
  a.push({ answer: correct, correct: true });
  const obj = {
    difficulty,
    question,
    answers: shuffle(a),
  };
  return obj;
}

export default shuffleAnswers;
