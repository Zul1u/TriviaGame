import { getPlayerInfoStorage } from './playerInfoStorage';

function createScoreboardStorage() {
  const socoreboard = localStorage.getItem('socoreboard');
  const playerInfo = getPlayerInfoStorage();

  if (!socoreboard && playerInfo) {
    const newStorage = [playerInfo];

    localStorage.setItem('socoreboard', JSON.stringify(newStorage));
  }
}

function getScoreboardStorage() {
  return JSON.parse(localStorage.getItem('socoreboard'));
}

function updateScoreboardStorage() {
  const socoreboard = getScoreboardStorage();

  if (socoreboard) {
    const playerInfo = getPlayerInfoStorage();
    const newStorage = [...socoreboard, playerInfo];
    return localStorage.setItem('socoreboard', JSON.stringify(newStorage));
  }
  return createScoreboardStorage();
}

function deleteScoreboardStorage() {
  localStorage.removeItem('socoreboard');
}

export {
  createScoreboardStorage,
  deleteScoreboardStorage,
  getScoreboardStorage,
  updateScoreboardStorage,
};
