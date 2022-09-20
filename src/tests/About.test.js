import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 2 - Teste se a página contém as informações sobre a Pokédex', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const titulo = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

    expect(titulo).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const primeiroParagr = screen.getByText(
      /application simulates a pokédex, a digital encyclopedia containing all pokémons/i,
    );
    const segundoParagr = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );

    expect(primeiroParagr).toBeInTheDocument();
    expect(segundoParagr).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imagem = screen.getByRole('img');
    expect(imagem.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
