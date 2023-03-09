function createPlayerInfoStorage(name = '', score = 0, question = '1/10') {
  const storageData = localStorage.getItem('playerInfo');
  const newStorage = { name, score, question };

  if (!storageData) {
    return localStorage.setItem('playerInfo', JSON.stringify(newStorage));
  }
  throw new Error('localStorage playerInfo already exists');
}

function deletePlayerInfoStorage() {
  localStorage.removeItem('playerInfo');
}

function getPlayerInfoStorage() {
  return JSON.parse(localStorage.getItem('playerInfo'));
}

function updatePlayerScore(questionScore) {
  const storageData = JSON.parse(localStorage.getItem('playerInfo'));
  const newScore = questionScore + storageData.score;
  if (storageData) {
    localStorage.setItem(
      'playerInfo',
      JSON.stringify({ ...storageData, score: newScore }),
    );
  }
}

function updatePlayerQuestion(numberQuestion) {
  const storageData = JSON.parse(localStorage.getItem('playerInfo'));
  if (storageData) {
    localStorage.setItem(
      'playerInfo',
      JSON.stringify({ ...storageData, question: `${numberQuestion}/10` }),
    );
  }
}

export {
  createPlayerInfoStorage,
  getPlayerInfoStorage,
  deletePlayerInfoStorage,
  updatePlayerScore,
  updatePlayerQuestion,
};
