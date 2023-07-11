import React, { useState}  from 'react';
import './playlist.css';
import { Movie } from '../Movie/Movie';
import { useNavigate } from 'react-router-dom';


export const Playlist = ({ playlist }) => {
  const { movies } = playlist; 
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  console.log(playlist)
  const handleClick = () => {
    setShowDetails(!showDetails);
  }
  const handleEditPlaylist = (id) => {
    navigate(`/edit-playlist/${id}`);
  }


  return (
    <div className="playlist-container">
      <button className="button_d"  onClick={handleClick}>Detalles</button>
      {showDetails ? 
        <div className="movies-wrapper">
          {movies.map(movie => (
            <Movie key={movie.id} movie={movie} />
          ))}
          <button className="button" onClick={()=>handleEditPlaylist(playlist.id)}>Editar Lista de Reproducción</button>
        </div>
      : null} 
    </div>
  );
}
