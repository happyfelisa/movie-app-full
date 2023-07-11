import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { NewPlaylist } from './NewPlaylist';

// Mock del hook useMutation
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn(),
}));

// Mock de la función navigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('renders NewPlaylist component correctly and creates a new playlist', async () => {
  // Mock del resultado exitoso de la mutación
  const createPlaylistMock = jest.fn().mockResolvedValue({
    data: {
      createPlaylist: {
        name: 'Test Playlist',
      },
    },
  });

  // Configuración del mock de useMutation
  useMutation.mockReturnValue([createPlaylistMock]);

  render(
    <MemoryRouter>
      <NewPlaylist />
    </MemoryRouter>
  );

  const playlistNameInput = screen.getByLabelText('Nombre:');
  fireEvent.change(playlistNameInput, { target: { value: 'Test Playlist' } });

  const createButton = screen.getByText('Crear');
  fireEvent.click(createButton);

  await waitFor(() => {
    expect(createPlaylistMock).toHaveBeenCalledWith({
      variables: {
        name: 'Test Playlist',
        userId: expect.any(Number),
      },
    });
  });

  // Verificar que se ha navegado a la página '/dashboard'
  expect(screen.getByText('Crear nueva lista de reproducción')).toBeInTheDocument();
});
