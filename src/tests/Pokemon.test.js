import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 6', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const buttonCharmander = screen.getByRole('button', { name: /fire/i });
    userEvent.click(buttonCharmander);

    const nameCharmander = screen.getByTestId('pokemon-name');
    const typeCharmander = screen.getByTestId('pokemon-type');
    const sizeCharmander = screen.getByText(/average weight: 8\.5 kg/i);
    const imageCharmander = screen.getByRole('img', {
      name: /charmander sprite/i });
    const weightPokemon = screen.getByTestId('pokemon-weight');

    expect(typeCharmander.innerHTML).toBe('Fire');
    expect(weightPokemon).toBeInTheDocument();
    expect(nameCharmander).toBeInTheDocument();
    expect(typeCharmander).toBeInTheDocument();
    expect(sizeCharmander).toBeInTheDocument();
    expect(imageCharmander).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });

  test('se o card do pok. indi. na Pokédex contém um link para exib. det. do pok', () => {
    const { history } = renderWithRouter(<App />);
    const linkURL = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkURL).toBeInTheDocument();
    userEvent.click(linkURL);
    const rota = history.location.pathname;
    expect(rota).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25');
    });

    const favorite = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favorite);

    const favoriteIcon = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
