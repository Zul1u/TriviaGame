function sumPlayerScore(difficulty, seconds) {
  switch (difficulty) {
    case 'hard':
      return seconds * 3;
    case 'medium':
      return seconds * 2;
    default:
      return seconds * 1;
  }
}

export default sumPlayerScore;
