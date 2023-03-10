/* eslint-disable object-curly-newline */
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import {
  deleteLocalStorage,
  getItemLocalStorage,
  questionReportFinalValue,
  setLocalStorage,
} from './mocks/mockLocalStorage';
import App from '../App';

describe('Scoreboard', () => {
  beforeAll(() => {
    const player = {
      name: 'Zu1lu',
      score: 200,
      questionReport: questionReportFinalValue,
    };
    setLocalStorage('scoreboard', [player]);
  });

  afterAll(() => {
    deleteLocalStorage('scoreboard');
  });

  it('Verify if the title is on the screen', () => {
    renderWithRouter(<App />, { route: '/scoreboard' });

    const title = screen.getByRole('heading', { level: 1, name: 'Scoreboard' });
    expect(title).toBeInTheDocument();
  });

  it('Verify if buttons are rendered correctly', () => {
    renderWithRouter(<App />, { route: '/scoreboard' });

    const goToHomeBtn = screen.getByRole('button', { name: 'Go to Home' });
    expect(goToHomeBtn).toBeInTheDocument();

    const playAgainBtn = screen.getByRole('button', { name: 'Play Again' });
    expect(playAgainBtn).toBeInTheDocument();
  });

  it('Verify if the goToHome button works correctly', async () => {
    renderWithRouter(<App />, { route: '/scoreboard' });

    const goToHomeBtn = screen.getByRole('button', { name: 'Go to Home' });

    await userEvent.click(goToHomeBtn);

    expect(window.location.pathname).toBe('/home');
  });

  it('Verify if the playAgainBtn button works correctly', async () => {
    renderWithRouter(<App />, { route: '/scoreboard' });

    const playAgainBtn = screen.getByRole('button', { name: 'Play Again' });

    await userEvent.click(playAgainBtn);

    const buttonCloseModal = screen.queryByRole('button', {
      name: 'X',
    });

    const nickNameInput = screen.getByPlaceholderText('Enter your nickname');
    const buttonPlay = screen.getByRole('button', {
      name: 'Play',
    });

    expect(nickNameInput).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonCloseModal).toBeInTheDocument();

    await userEvent.click(buttonCloseModal);

    expect(buttonCloseModal).not.toBeInTheDocument();
  });

  it('Verify that all items in the modal are working correctly', async () => {
    renderWithRouter(<App />, { route: '/scoreboard' });

    const playAgainBtn = screen.getByRole('button', { name: 'Play Again' });

    await userEvent.click(playAgainBtn);

    const nickNameInput = screen.getByPlaceholderText('Enter your nickname');
    const buttonPlay = screen.getByRole('button', {
      name: 'Play',
    });

    await userEvent.type(nickNameInput, 'Zu1lu');

    const nickName = screen.getByDisplayValue('Zu1lu');
    expect(nickName).toBeInTheDocument();

    await userEvent.click(buttonPlay);

    expect(window.location.pathname).toBe('/game/question/1');
  });
});

describe('PlayerReportCard', () => {
  beforeAll(() => {
    const playerOne = {
      name: 'Zu1lu',
      score: 199,
      questionReport: questionReportFinalValue,
    };
    const playerTwo = {
      name: 'Arthur',
      score: 200,
      questionReport: questionReportFinalValue,
    };
    setLocalStorage('scoreboard', [playerOne, playerTwo]);
  });

  afterAll(() => {
    deleteLocalStorage('scoreboard');
  });

  it('Verify that all players display correctly', async () => {
    renderWithRouter(<App />, { route: '/scoreboard' });

    const scoreboard = await getItemLocalStorage('scoreboard');

    const cards = screen.getAllByText(/score:/i);

    expect(cards.length).toBe(scoreboard.length);
  });

  it('Verify if the players names display correctly', async () => {
    renderWithRouter(<App />, { route: '/scoreboard' });

    const scoreboard = await getItemLocalStorage('scoreboard');

    scoreboard.forEach((player) => {
      const playeName = screen.getByText(player.name);
      expect(playeName).toBeInTheDocument();
    });
  });

  it('Verify if the players score display correctly', async () => {
    renderWithRouter(<App />, { route: '/scoreboard' });

    const scoreboard = await getItemLocalStorage('scoreboard');

    scoreboard.forEach((player) => {
      const score = screen.getByText(`Score: ${player.score}`);
      expect(score).toBeInTheDocument();
    });
  });

  it('Verify if the players hits display correctly', async () => {
    renderWithRouter(<App />, { route: '/scoreboard' });

    const scoreboard = await getItemLocalStorage('scoreboard');

    const hits = screen.getAllByText(`Hits: ${scoreboard[0].questionReport.hitNumber}`);
    expect(hits[0]).toBeInTheDocument();
  });

  it('Verify if the players mistakes display correctly', async () => {
    renderWithRouter(<App />, { route: '/scoreboard' });

    const [firstPlayer] = await getItemLocalStorage('scoreboard');
    const { questionReport } = firstPlayer;

    const calcMistakes = questionReport.questionNumber - questionReport.hitNumber;

    const mistakes = screen.getAllByText(`Mistakes: ${calcMistakes}`);
    expect(mistakes[0]).toBeInTheDocument();
  });
});
