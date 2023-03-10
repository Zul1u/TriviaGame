import { getPlayerInfoStorage } from './playerInfoStorage';

function getScoreboardStorage() {
  const socoreboard = localStorage.getItem('socoreboard');
  if (socoreboard) return JSON.parse(socoreboard);
  return null;
}

function createScoreboardStorage() {
  const socoreboard = getScoreboardStorage();
  const playerInfo = getPlayerInfoStorage();

  if (!socoreboard && playerInfo) {
    const newStorage = [playerInfo];

    return localStorage.setItem('socoreboard', JSON.stringify(newStorage));
  }

  if (!socoreboard && !playerInfo) {
    return localStorage.setItem('socoreboard', JSON.stringify([]));
  }

  throw new Error('Oops! Something went wrong :(');
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
