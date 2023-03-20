/* eslint-disable object-curly-newline */
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { newPlayerStorage, deleteLocalStorage, setLocalStorage } from './mocks/mockLocalStorage';
import App from '../App';
import apiResponse from './mocks/mockTriviaApi';

describe('Timer', () => {
  beforeAll(() => {
    setLocalStorage('playerInfo', newPlayerStorage);

    global.fetch = vi.fn(async () => ({
      json: async () => apiResponse,
    }));
  });

  afterAll(() => {
    deleteLocalStorage('playerInfo');
    vi.clearAllMocks();
  });

  it('Verify sure the timer is in the screen', async () => {
    renderWithRouter(<App />, { route: '/game/question/1' });

    const timer = await screen.findByTestId('timer-component');
    expect(timer).toBeInTheDocument();
  });
});

describe('Verify sure the question text and answer buttons are on the screen and the buttons functionalities', () => {
  beforeAll(() => {
    setLocalStorage('playerInfo', newPlayerStorage);

    global.fetch = vi.fn(async () => ({
      json: async () => apiResponse,
    }));
  });

  afterAll(() => {
    deleteLocalStorage('playerInfo');
    vi.clearAllMocks();
  });

  describe('game/question/1', () => {
    it('Checks that the question is correctly rendered on the screen', async () => {
      renderWithRouter(<App />, { route: '/game/question/1' });

      const question = await screen.findByText(/i'm a/i);
      expect(question).toBeInTheDocument();
    });

    it('Checks if the answer buttons are on the screen and their quantity', async () => {
      renderWithRouter(<App />, { route: '/game/question/1' });

      const answers = await screen.findAllByRole('button', { name: /yes/ });
      answers.forEach((answer) => expect(answer).toBeInTheDocument());
      expect(answers.length).toBe(4);
    });

    it('Checks if when clicking on a response all buttons are disabled', async () => {
      renderWithRouter(<App />, { route: '/game/question/1' });

      const answer = await screen.findByRole('button', { name: 'yes' });
      expect(answer).toBeEnabled();

      await userEvent.click(answer);

      const answers = await screen.findAllByRole('button', { name: /yes/ });
      answers.forEach((btn) => expect(btn).not.toBeEnabled());
    });

    it('Button next functionality', async () => {
      renderWithRouter(<App />, { route: '/game/question/1' });

      const answer = await screen.findByRole('button', { name: 'yes' });
      await userEvent.click(answer);

      const next = await screen.findByRole('button', {
        name: 'NEXT QUESTION',
      });

      expect(next).toBeInTheDocument();
      await userEvent.click(next);

      expect(window.location.pathname).toBe('/game/question/2');
    });
  });

  describe('game/question/2', () => {
    it('Checks that the question is correctly rendered on the screen', async () => {
      renderWithRouter(<App />, { route: '/game/question/2' });

      const question = await screen.findByText(/i'm not/i);
      expect(question).toBeInTheDocument();
    });

    it('Checks if the answer buttons are on the screen and their quantity', async () => {
      renderWithRouter(<App />, { route: '/game/question/2' });

      const answers = await screen.findAllByRole('button', { name: /no/ });
      answers.forEach((answer) => expect(answer).toBeInTheDocument());
      expect(answers.length).toBe(2);
    });

    it('Scoreboard button functionality', async () => {
      renderWithRouter(<App />, { route: '/game/question/2' });

      const answer = await screen.findByRole('button', { name: 'no' });
      await userEvent.click(answer);

      const scoreboard = await screen.findByRole('button', {
        name: 'Scoreboard',
      });
      expect(scoreboard).toBeInTheDocument();

      await userEvent.click(scoreboard);
      expect(window.location.pathname).toBe('/scoreboard');
    });
  });
});

describe('Header', () => {
  beforeAll(() => {
    setLocalStorage('playerInfo', newPlayerStorage);
  });

  afterAll(() => {
    deleteLocalStorage('playerInfo');
  });

  it('Verify sure the nickname is in the header', async () => {
    renderWithRouter(<App />, { route: '/game/question/1' });

    const nickName = await screen.findByText('Zu1lu');
    expect(nickName).toBeInTheDocument();
  });

  it('Verify sure the score is in the header', async () => {
    renderWithRouter(<App />, { route: '/game/question/1' });

    const score = await screen.findByText(/Score:/i);
    expect(score).toBeInTheDocument();
  });

  it('Verify sure the question number is in the header', async () => {
    renderWithRouter(<App />, { route: '/game/question/1' });

    const question = await screen.findByText(/Question:/i);
    expect(question).toBeInTheDocument();
  });

  it('Checks if the question number updates when we go to the next page', async () => {
    renderWithRouter(<App />, { route: '/game/question/1' });

    const firstQuestion = await screen.findByText('Question: 1/10');
    expect(firstQuestion).toBeInTheDocument();

    const answer = await screen.findByRole('button', { name: 'yes' });

    await userEvent.click(answer);

    const next = await screen.findByRole('button', {
      name: 'NEXT QUESTION',
    });

    await userEvent.click(next);

    const secondQuestion = await screen.findByText('Question: 2/10');
    expect(secondQuestion).toBeInTheDocument();
  });

  it('verifies that the Back To Home Page button renders correctly and its functionality', async () => {
    renderWithRouter(<App />, { route: '/game/question/1' });
    const backToHomeBtn = await screen.findByRole('button', { name: 'Back To Home Page' });
    expect(backToHomeBtn).toBeInTheDocument();

    await userEvent.click(backToHomeBtn);

    expect(window.location.pathname).toBe('/home');
  });
});
