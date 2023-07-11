import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './editplaylist.css';
import { useQuery, gql, useMutation } from "@apollo/client";

export const EditPlaylist = ({ match }) => {
  const params = useParams();
  const PLAYLIST_DETAIL_QUERY = gql`
  query{
    playlist(id:${params.id}){
      id
      name
      movies{
        id
        title
        overview
        posterPath
      }
    }
  }
  `;
  const playlistData = useQuery(PLAYLIST_DETAIL_QUERY)
  const MOVIES_QUERY = gql`
  query{
    movies{
      id
      title
      overview
      posterPath
    }
  }
  `;
  const moviesData = useQuery(MOVIES_QUERY);
  console.log(moviesData.data)
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [name, setName] = useState('');
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [removalCandidate, setRemovalCandidate] = useState(null);
  const [showMovies, setShowMovies] = useState(false);
  const [addCandidate, setAddCandidate] = useState(null);

  useEffect(() => {
    
      try {
        if(playlistData) {
          setPlaylist(playlistData.data.playlist);
          setName(playlistData.data.playlist.name);
          setMovies(playlistData.data.playlist.movies);   
        }
        try {
          if(moviesData) {
            const details = {};
            moviesData.data.movies.forEach(movie => {
              if(true){
                details[movie.id] = movie;
              }
              
            });
            setMovieDetails(details);  
          }
        } catch (error) {
          console.log(error.message)
        }
      } catch (error) {
        console.log(error.message)
      }
  }, [playlistData,moviesData]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMovieList = () => {
    setShowMovies(!showMovies);
  };

  const handleRemoveMovie = (movieId) => {
    setRemovalCandidate(movieId);
  };

  const handleAddMovie = (movieId) => {
    setAddCandidate(movieId);
  };

  const confirmAddMovie = () => {
    const movieAdded = Object.values(movieDetails).find(movie => {
      return movie.id === addCandidate;
    });
    setMovies([...movies, movieAdded]);
    setMovieDetails(prevDetails => {
      const newDetails = { ...prevDetails };
      delete newDetails[removalCandidate];
      return newDetails;
    });
    setAddCandidate(null);
  };

  const confirmRemoveMovie = () => {
    setMovies(movies.filter(movie => movie.id !== removalCandidate));
    setMovieDetails(prevDetails => {
      const newDetails = { ...prevDetails };
      delete newDetails[removalCandidate];
      return newDetails;
    });
    setRemovalCandidate(null);
  };

  const cancelRemoveMovie = () => {
    setRemovalCandidate(null);
  };

  const cancelAddMovie = () => {
    setAddCandidate(null);
  };

  const UPDATE_PLAYLIST_QUERY = gql`
  mutation updatePlaylist($id: Float!, $name: String!, $movies: [Float!]!){
    updatePlaylist(updatePlaylistInput: {id: $id, name: $name, movies:$movies}){
      id
      name
      movies{
        id
        title
        overview
        posterPath
      }
    }
  }
  `;

  const [updatePlaylist] = useMutation(UPDATE_PLAYLIST_QUERY,{
    refetchQueries: [
      { query: PLAYLIST_DETAIL_QUERY },
    ]
  });


  if (!playlist) {
    return <p>Cargando lista de reproducción...</p>;
  }

  let filtered = {};
  if(playlistData && moviesData){
    filtered = moviesData.data.movies.filter((movie) => 
      !playlistData.data.playlist.movies.some((mov) => mov.id === movie.id)
    );
    console.log('FILTRADOS',filtered)
  }

  
  console.log(movieDetails)

  return (
    <div className="edit-playlist-container">
    <h2>Editar lista de reproducción</h2>
    <form onSubmit={(e) => {
      e.preventDefault();
      updatePlaylist({
        variables: {
          id: +params.id,
          name: name,
          movies: movies ? movies.map(movie => +movie.id) : [],
        }
      });
      navigate('/dashboard');
    }}>
    <label>
      Nombre:
      <input type="text" value={name} onChange={handleNameChange} />
    </label>
    <h3>Películas en la lista:</h3>
      <ul>
      {movies ?
      <div>
      {movies.map(movie => (
        <li key={movie.id}>
        <p>{movie.id} - {movieDetails[movie.id] ? movieDetails[movie.id].title : 'Cargando...'}</p>
        <button type="button" onClick={() => handleRemoveMovie(movie.id)}>Eliminar de la lista</button>
        {removalCandidate === movie.id && (
          <div>
           <p>¿Estás seguro de que quieres eliminar esta película de la lista?</p>
          <button type="button" onClick={confirmRemoveMovie}>Sí</button>
          <button type="button" onClick={cancelRemoveMovie}>No</button>
          </div>
          )}
        </li>
        ))}
        </div> 
        : <p>Cargando datos de la pelicula...</p>
        }
      </ul>
        <button type="button" onClick={handleMovieList}>Agregar Peliculas</button>
        {showMovies ? (
        <div>
      <ul>
      {Object.values(filtered).map(movie => (
      <li key={movie.id}>
         <p>{movie.id} - {movie.title}</p>
          <button type="button" onClick={() => handleAddMovie(movie.id)}>add</button>
          {addCandidate === movie.id && (
         <div>
           <p>¿Estás seguro de que quieres agregar esta película a la lista?</p>
           <button type="button" onClick={confirmAddMovie}>Sí</button>
           <button type="button" onClick={cancelAddMovie}>No</button>
         </div>
         )}
      </li>
      ))}
    </ul>
       </div>
       ) : null}
      <div className="button-container">
       <button type="submit">Guardar cambios</button>
      </div>
    </form>
    </div>
  );
}
