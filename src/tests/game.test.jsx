/* eslint-disable object-curly-newline */
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { deleteLocalStorage, setLocalStorage } from './mocks/mockLocalStorage';
import App from '../App';
import apiResponse from './mocks/mockTriviaApi';

describe('Header', () => {
  beforeAll(() => {
    const newStorage = { name: 'Zu1lu', score: 0, question: '1/10' };
    setLocalStorage('playerInfo', newStorage);
  });

  afterAll(() => {
    deleteLocalStorage('playerInfo');
  });

  it('Verify sure the nickname is in the header', () => {
    renderWithRouter(<App />, { route: '/game/question/1' });

    const nickName = screen.getByText('Zu1lu');
    expect(nickName).toBeInTheDocument();
  });

  it('Verify sure the score is in the header', () => {
    renderWithRouter(<App />, { route: '/game/question/1' });

    const nickName = screen.getByText(/Score:/i);
    expect(nickName).toBeInTheDocument();
  });

  it('Verify sure the question number is in the header', () => {
    renderWithRouter(<App />, { route: '/game/question/1' });

    const nickName = screen.getByText(/Question:/i);
    expect(nickName).toBeInTheDocument();
  });
});

describe('Timer', () => {
  beforeAll(() => {
    const newStorage = { name: 'Zu1lu', score: 0, question: '1/10' };
    setLocalStorage('playerInfo', newStorage);

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
    const newStorage = { name: 'Zu1lu', score: 0, question: '1/10' };
    setLocalStorage('playerInfo', newStorage);

    global.fetch = vi.fn(async () => ({
      json: async () => apiResponse,
    }));
  });

  afterAll(() => {
    deleteLocalStorage('playerInfo');
    vi.clearAllMocks();
  });

  describe('game/question/1', () => {
    it('Question', async () => {
      renderWithRouter(<App />, { route: '/game/question/1' });

      const question = await screen.findByText(/i'm a/i);
      expect(question).toBeInTheDocument();
    });

    it('Answer button', async () => {
      renderWithRouter(<App />, { route: '/game/question/1' });

      const answer = await screen.findAllByRole('button', { name: /yes/ });
      expect(answer[0]).toBeInTheDocument();
      expect(answer.length).toBe(4);
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
    it('Question', async () => {
      renderWithRouter(<App />, { route: '/game/question/2' });

      const question = await screen.findByText(/i'm not/i);
      expect(question).toBeInTheDocument();
    });

    it('Answer button', async () => {
      renderWithRouter(<App />, { route: '/game/question/2' });

      const answer = await screen.findAllByRole('button', { name: /no/ });
      expect(answer[0]).toBeInTheDocument();
      expect(answer.length).toBe(2);
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
