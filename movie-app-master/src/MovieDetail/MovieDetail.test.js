import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { MovieDetail } from './MovieDetail';
import { gql } from '@apollo/client';

const mockMovie = {
  id: '1',
  title: 'Test Movie',
  overview: 'Test Overview',
  posterPath: 'test-movie.jpg',
  actors: [
    { name: 'Actor 1' },
    { name: 'Actor 2' },
  ],
};

const mocks = [
  {
    request: {
      query: gql`
        query {
          movie(id: 1) {
            id
            title
            overview
            posterPath
            actors {
              name
            }
          }
        }
      `,
    },
    result: {
      data: {
        movie: mockMovie,
      },
    },
  },
];

test('renders MovieDetail component correctly', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <MemoryRouter initialEntries={['/movie/1']}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    </MockedProvider>
  );

  expect(screen.getByText('Cargando detalles de la película...')).toBeInTheDocument();

  const movieTitle = await screen.findByText(mockMovie.title);
  expect(movieTitle).toBeInTheDocument();

  const movieOverview = await screen.findByText(mockMovie.overview);
  expect(movieOverview).toBeInTheDocument();

  const movieActor1 = await screen.findByText(mockMovie.actors[0].name);
  expect(movieActor1).toBeInTheDocument();

  const movieActor2 = await screen.findByText(mockMovie.actors[1].name);
  expect(movieActor2).toBeInTheDocument();
});

  
