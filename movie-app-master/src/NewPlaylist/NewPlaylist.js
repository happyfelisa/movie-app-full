import React, { useState } from 'react';
import './newplaylist.css';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { PLAYLIST_QUERY } from '../Dashboard/Dashboard';


export const NewPlaylist = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"))

  console.log('NEWPL',userId)

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const CREATE_PLAYLIST_QUERY = gql`
    mutation createPlaylist($name: String!, $userId: Float!){
      createPlaylist(createPlaylistInput: { name: $name, userId: $userId }) {
        name
      }
    }
  `
  const [createPlaylist] = useMutation(CREATE_PLAYLIST_QUERY,{
    refetchQueries: [
      { query: PLAYLIST_QUERY },
    ]
  });


  return (
    <div className="new-playlist-container">
      <h2>Crear nueva lista de reproducción</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        createPlaylist({
          variables: {
            name: name,
            userId: +userId,
          }
        });
        navigate('/dashboard')
      }}>
        <label>
          Nombre:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
