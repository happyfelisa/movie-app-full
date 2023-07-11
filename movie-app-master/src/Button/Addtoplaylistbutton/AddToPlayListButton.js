import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AddToPlaylistButton = ({ movie }) => {
  const [playlists, setPlaylists] = useState([]);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showNewPlaylistForm, setShowNewPlaylistForm] = useState(false);

  useEffect(() => {
    // Suponiendo que tienes una API para obtener todas las listas de reproducción
    axios.get('/playlist/playlists')
      .then(response => {
        setPlaylists(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener las listas de reproducción:', error);
      });
  }, []);

  const handleAddToPlaylist = (playlist) => {
    // Aquí tendrías que llamar a tu API para añadir la película a la lista de reproducción seleccionada
    axios.post(`/playlist/${playlist.id}/movies`, {
      movieId: movie.id
    })
      .then(response => {
        console.log('Película añadida a la lista de reproducción');
      })
      .catch(error => {
        console.error('Hubo un error al añadir la película a la lista de reproducción:', error);
      });
  };

  const handleCreatePlaylist = (e) => {
    e.preventDefault();
    // Aquí tendrías que llamar a tu API para crear una nueva lista de reproducción
    axios.post(`/playlist/create`, {
      name: newPlaylistName,
      movies: [movie.id]
    })
      .then(response => {
        setPlaylists([...playlists, response.data]);
        setShowNewPlaylistForm(false);
      })
      .catch(error => {
        console.error('Hubo un error al crear la lista de reproducción:', error);
      });
  };

  return (
    <div>
      <button type='button' onClick={() => setShowPlaylists(!showPlaylists)}>
        Añadir a lista de reproducción
      </button>
      {showPlaylists && (
        <div>
          <ul>
            {playlists.map(playlist => (
              <li key={playlist.id} onClick={() => handleAddToPlaylist(playlist)}>
                {playlist.name}
              </li>
            ))}
            <li onClick={() => setShowNewPlaylistForm(true)}>
              <span style={{fontSize: '24px'}}>+</span> Crear nueva lista de reproducción
            </li>
          </ul>
          {showNewPlaylistForm && (
            <form onSubmit={handleCreatePlaylist}>
              <input 
                type="text" 
                value={newPlaylistName} 
                onChange={(e) => setNewPlaylistName(e.target.value)} 
                placeholder="Nombre de la nueva lista de reproducción"
              />
              <button type="submit">Crear</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
