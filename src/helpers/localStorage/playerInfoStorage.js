const defaultQuestionReportValue = {
  questionNumber: 1,
  hitNumber: 0,
};

function createPlayerInfoStorage(name = '', score = 0, questionReport = defaultQuestionReportValue) {
  const storageData = localStorage.getItem('playerInfo');
  const newStorage = { name, score, questionReport };

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

function updatePlayerScore(score) {
  const storageData = getPlayerInfoStorage();

  if (storageData) {
    const newScore = score + storageData.score;

    localStorage.setItem(
      'playerInfo',
      JSON.stringify({ ...storageData, score: newScore }),
    );
  }
}

function updatePlayerQuestion({ hit, questionNumber }) {
  const storageData = getPlayerInfoStorage();

  if (storageData) {
    const { questionReport } = storageData;
    const newQuestionReport = {
      questionNumber,
      hitNumber: hit ? questionReport.hitNumber + 1 : questionReport.hitNumber,
    };

    localStorage.setItem(
      'playerInfo',
      JSON.stringify({ ...storageData, questionReport: newQuestionReport }),
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
