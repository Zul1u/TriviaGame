import { getPlayerInfoStorage } from './playerInfoStorage';

function getScoreboardStorage() {
  const scoreboard = localStorage.getItem('scoreboard');
  if (scoreboard) return JSON.parse(scoreboard);
  return null;
}

function createScoreboardStorage() {
  const scoreboard = getScoreboardStorage();
  const playerInfo = getPlayerInfoStorage();

  if (!scoreboard && playerInfo) {
    const newStorage = [playerInfo];

    return localStorage.setItem('scoreboard', JSON.stringify(newStorage));
  }

  if (!scoreboard && !playerInfo) {
    return localStorage.setItem('scoreboard', JSON.stringify([]));
  }

  throw new Error('Oops! Something went wrong :(');
}

function updateScoreboardStorage() {
  const scoreboard = getScoreboardStorage();

  if (scoreboard) {
    const playerInfo = getPlayerInfoStorage();
    const newStorage = [...scoreboard, playerInfo];
    return localStorage.setItem('scoreboard', JSON.stringify(newStorage));
  }
  return createScoreboardStorage();
}

function deleteScoreboardStorage() {
  localStorage.removeItem('scoreboard');
}

export {
  createScoreboardStorage,
  deleteScoreboardStorage,
  getScoreboardStorage,
  updateScoreboardStorage,
};
