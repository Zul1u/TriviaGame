import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Checks that all elements are on the screen', () => {
  it('checks if when entering the path "/" you are redirected to the path "/home"', async () => {
    renderWithRouter(<App />, { route: '/' });
    expect(window.location.pathname).toBe('/home');
  });

  it('Header/title', () => {
    renderWithRouter(<App />, { route: '/home' });
    const title = screen.getByRole('heading', {
      level: 1,
      name: 'Welcome to Trivia Game!!',
    });
    expect(title).toBeInTheDocument();
  });

  it('Game description', () => {
    renderWithRouter(<App />, { route: '/home' });
    const description = screen.getByText(/Test your general knowledge/i);
    expect(description).toBeInTheDocument();
  });

  it('Buttons', () => {
    renderWithRouter(<App />, { route: '/home' });
    const buttonStart = screen.getByRole('button', {
      name: 'Start New Game',
    });
    const buttonScoreboard = screen.getByRole('button', {
      name: 'Scoreboard',
    });
    expect(buttonStart).toBeInTheDocument();
    expect(buttonScoreboard).toBeInTheDocument();
  });
});

describe('Check the functionality of the buttons', () => {
  it('Scoreboard Button', async () => {
    renderWithRouter(<App />, { route: '/home' });

    const buttonScoreboard = screen.getByRole('button', {
      name: 'Scoreboard',
    });

    expect(buttonScoreboard).toBeInTheDocument();

    await userEvent.click(buttonScoreboard);
    expect(window.location.pathname).toBe('/scoreboard');
  });

  it('Button Start New Game', async () => {
    renderWithRouter(<App />, { route: '/home' });

    const buttonStart = screen.getByRole('button', {
      name: 'Start New Game',
    });

    expect(buttonStart).toBeInTheDocument();

    await userEvent.click(buttonStart);

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
    renderWithRouter(<App />, { route: '/home' });

    const buttonStart = screen.getByRole('button', {
      name: 'Start New Game',
    });

    await userEvent.click(buttonStart);

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
