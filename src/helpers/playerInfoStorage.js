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

export {
  createPlayerInfoStorage,
  getPlayerInfoStorage,
  deletePlayerInfoStorage,
};
