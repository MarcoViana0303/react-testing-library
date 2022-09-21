import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 6', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const buttonCharmander = screen.getByRole('button', { name: /fire/i });
    userEvent.click(buttonCharmander);
    const nameCharmander = screen.getByText(/charmander/i);
    const typeCharmander = screen.getByText(/charmander/i);
    const sizeCharmander = screen.getByText(/average weight: 8\.5 kg/i);
    const imageCharmander = screen.getByRole('img', {
      name: /charmander sprite/i });
    expect(nameCharmander).toBeInTheDocument();
    expect(typeCharmander).toBeInTheDocument();
    expect(sizeCharmander).toBeInTheDocument();
    expect(imageCharmander).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });
});
