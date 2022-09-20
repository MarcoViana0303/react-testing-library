import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 1', () => {
  test('se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
    // Renderizar componente
    const { getByText } = renderWithRouter(<App />);
    // Buscar link com o texto Home
    expect(getByText(/home/i)).toHaveAttribute('class', 'link');
    // Buscar link com o texto About
    expect(getByText(/about/i)).toHaveAttribute('class', 'link');
    // Buscar link com o texto Favorite Pokémons
    expect(getByText(/favorite pokémons/i)).toHaveAttribute('class', 'link');
  });

  test('aplicação redirec. para página inicial, na URL / ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    // Pegar o elemento do link Home
    const homeEl = screen.getByRole('link', { name: 'Home' });
    // Clicar no link
    userEvent.click(homeEl);
    // Verificar se a rota é /
    const rota = history.location.pathname;
    expect(rota).toBe('/');
  });

  test('aplic. redirec. para página about, na URL /about ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    // Pegar o elemento do link About
    const aboutEl = screen.getByRole('link', { name: 'About' });
    // Clicar no link
    userEvent.click(aboutEl);
    // Verificar se a rota é /about
    const rota = history.location.pathname;
    expect(rota).toBe('/about');
  });

  test('redir. p pág Pok Favorit, na URL /favorites ao click no link Favor Poké', () => {
    const { history } = renderWithRouter(<App />);
    // Pegar o elemento do link Favorite
    const favoriteEl = screen.getByRole('link', { name: /favorite pokémons/i });
    // Clicar no link
    userEvent.click(favoriteEl);
    // Verificar se a rota é /favorites
    const rota = history.location.pathname;
    expect(rota).toBe('/favorites');
  });

  test('se a aplicação é redirec. para página Not Found ao entrar em URL desc.', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina/que-nao-existe/');
    });

    const notFoundTitle = screen.getByRole(
      'heading',
      { name: /Page requested not found/i },
    );
    const imagePikachu = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });

    expect(notFoundTitle).toBeInTheDocument();
    expect(imagePikachu).toBeInTheDocument();
  });
});
