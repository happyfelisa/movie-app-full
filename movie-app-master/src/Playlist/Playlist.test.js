import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Playlist } from './Playlist';
import { MemoryRouter } from 'react-router-dom';
test('renders Playlist component correctly and toggles movie details', () => {
  const playlist = {
    id: '1',
    movies: [
      { id: '1', title: 'Test Movie 1', posterPath: 'test-movie-1.jpg' },
      { id: '2', title: 'Test Movie 2', posterPath: 'test-movie-2.jpg' }
    ]
  };
  render(
    <MemoryRouter>
      <Playlist playlist={playlist} />
    </MemoryRouter>
  );

  // Verificar que el botón "Detalles" esté presente
  expect(screen.getByText('Detalles')).toBeInTheDocument();

  // Verificar que la sección de detalles de la película no esté visible inicialmente
  expect(screen.queryByText('Test Movie 1')).not.toBeInTheDocument();
  expect(screen.queryByText('Test Movie 2')).not.toBeInTheDocument();

  // Hacer clic en el botón "Detalles"
  fireEvent.click(screen.getByText('Detalles'));

  // Verificar que la sección de detalles de la película esté visible después de hacer clic en el botón "Detalles"
  expect(screen.getByText('Test Movie 1')).toBeInTheDocument();
  expect(screen.getByText('Test Movie 2')).toBeInTheDocument();

  // Verificar que el botón "Editar Lista de Reproducción" esté presente
  expect(screen.getByText('Editar Lista de Reproducción')).toBeInTheDocument();
});

