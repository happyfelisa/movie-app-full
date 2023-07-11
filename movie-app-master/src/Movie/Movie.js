import React, { } from 'react';
import './movie.css'
import { useNavigate } from 'react-router-dom';


export const Movie = ({ movie }) => {
  const navigate = useNavigate();
  const { title,posterPath } = movie;
  const image = 'https://image.tmdb.org/t/p/w185/' + posterPath;
  const handleClick =  (id) => {
    navigate(`/movie/${id}`);
  }
  return (
    <div className="movie-item">
      <h3>{title}</h3>
      <div className="movie-detail-content">
        <img src={image} alt={title} />
        <div className="description-container">
        <button className="button_de"  onClick={()=>handleClick(movie.id)}>Detalles</button>
         <div>
        </div>
        </div>
      </div> 
    </div>
  );
}