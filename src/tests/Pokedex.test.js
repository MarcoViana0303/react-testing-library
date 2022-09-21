import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 5', () => {
  test('se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const textEl = screen.getByRole('heading', {
      name: /Encountered pokémons/i, level: 2 });
    expect(textEl).toBeInTheDocument();
  });
  test('se é exibido o próximo pokémon quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    const botaoEl = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(botaoEl);
    const charmanderImage = screen.getByRole('img', {
      name: /charmander sprite/i,
    });
    expect(charmanderImage).toBeInTheDocument();
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const buttonsEl = screen.getAllByTestId('pokemon-type-button');
    const eletric = screen.getByRole('button', {
      name: /electric/i,
    });
    const fire = screen.getByRole('button', {
      name: /fire/i,
    });
    const bug = screen.getByRole('button', {
      name: /bug/i,
    });
    const poison = screen.getByRole('button', {
      name: /poison/i,
    });
    const psychic = screen.getByRole('button', {
      name: /psychic/i,
    });
    const normal = screen.getByRole('button', {
      name: /normal/i,
    });
    const dragon = screen.getByRole('button', {
      name: /dragon/i,
    });
    const tamanho = 7;
    expect(buttonsEl).toHaveLength(tamanho);
    expect(eletric).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const botaoReset = screen.getByRole('button', { name: /all/i });
    expect(botaoReset).toBeInTheDocument();
    userEvent.click(botaoReset);
  });
});
