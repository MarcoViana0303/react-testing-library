import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

describe('Requisito 3', () => {
  test('exib. na tela No favorite pokemon found, se a pessoa não tiver pok. fav.', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText(/no favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  test('se são exibidos todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/4');
    });
    /*  const botaoCharmander = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(botaoCharmander); */

    const favoritePokemon = screen.getByRole('checkbox');
    userEvent.click(favoritePokemon);
    act(() => {
      history.push('/favorites');
    });
    const NotFound = screen.queryByText(/no favorite pokemon found/i);
    expect(NotFound).toBeFalsy();
  });
});
