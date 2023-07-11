import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { Movie } from './Movie'; 


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockMovie = {
  id: '1',
  title: 'Test Movie',
  posterPath: 'test-movie.jpg'
};

test('renders Movie component correctly and navigates to correct route on button click', () => {
  const mockNavigate = jest.fn();

  jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);

  render(<Movie movie={mockMovie} />);

  expect(screen.getByText(mockMovie.title)).toBeInTheDocument();

  
  expect(screen.getByAltText(mockMovie.title)).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w185/' + mockMovie.posterPath);

  const detailsButton = screen.getByText(/Detalles/i);
  fireEvent.click(detailsButton);

 
  expect(mockNavigate).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
});


