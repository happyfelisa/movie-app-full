import { render } from '@testing-library/react'
import { Dashboard, PLAYLIST_QUERY } from './Dashboard'
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';




// Mocker para la query de apollo
const mocks = [
  {
    request: {
      query: PLAYLIST_QUERY
    },
    result: {
      data: {
        playlists: [
          {
            id: '1',
            name: 'My Playlist',
            userId: '1',
            movies: [
              {
                id: '1',
                title: 'Movie 1',
                posterPath: 'https://example.com/movie1.jpg'
              }
            ]
          }
        ]
      }
    }
  }
]
  
describe('Dashboard Component', () => {
  it('renders without error', () => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Dashboard />
        </MockedProvider>
      </BrowserRouter>
    );
  });

  it('should display playlist when data is available', async () => {
    render(
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Dashboard />
        </MockedProvider>
      </BrowserRouter>
    );

  });

});