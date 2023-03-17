import he from 'he';

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
  const answers = incorrects.map((answer) => ({
    answer: he.decode(answer),
    correct: false,
  }));
  answers.push({ answer: correct, correct: true });
  const questionsInfo = {
    difficulty,
    question: he.decode(question),
    answers: shuffle(answers),
  };
  return questionsInfo;
}

export default shuffleAnswers;
