import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page/Home';
import renderWithRouter from './helpers/renderWithRouter';

describe('Checks that all elements are on the screen', () => {
  it('Header/title', () => {
    renderWithRouter(<Home />);
    const title = screen.getByRole('heading', {
      level: 1,
      name: 'Welcome to Trivia Game!!',
    });
    expect(title).toBeInTheDocument();
  });
  it('Game description', () => {
    renderWithRouter(<Home />);
    const description = screen.getByText(/Test your general knowledge/i);
    expect(description).toBeInTheDocument();
  });
  it('Buttons', () => {
    renderWithRouter(<Home />);
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
    renderWithRouter(<Home />, { route: '/home' });

    const buttonScoreboard = screen.getByRole('button', {
      name: 'Scoreboard',
    });

    expect(buttonScoreboard).toBeInTheDocument();

    await userEvent.click(buttonScoreboard);
    expect(window.location.pathname).toBe('/scoreboard');
  });

  it('Button Start New Game', async () => {
    renderWithRouter(<Home />, { route: '/home' });

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

  it('Button Play', async () => {
    renderWithRouter(<Home />, { route: '/home' });

    const buttonStart = screen.getByRole('button', {
      name: 'Start New Game',
    });

    expect(buttonStart).toBeInTheDocument();

    await userEvent.click(buttonStart);

    const nickNameInput = screen.getByPlaceholderText('Enter your nickname');
    const buttonPlay = screen.getByRole('button', {
      name: 'Play',
    });

    await userEvent.type(nickNameInput, 'Zu1lu');
    await userEvent.click(buttonPlay);

    expect(window.location.pathname).toBe('/game/question/1');
  });
});
