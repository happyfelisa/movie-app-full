import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './moviedetail.css';
import { useQuery, gql } from "@apollo/client";


export const MovieDetail = () => {
  const { id } = useParams();
  const MOVIE_QUERY = gql`
  query{
    movie(id:${id}){
      id
      title
      overview
      posterPath
      actors{
        name
      }
    }
  }
  `;
  const { data } = useQuery(MOVIE_QUERY);
  console.log(data)
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if(data){
          setMovieDetails(data.movie)
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovieDetails();
  }, [data]);

  console.log(movieDetails);

  return (
    <div>
      {error ? (
        <p>Error al cargar los detalles de la película.</p>
      ) : movieDetails ? (
        <div className="movie-detail-content">
          <h3 className="movie-title">{movieDetails.title}</h3>
          <div className="movie-info">
            <div className="movie-image">
              <img src={`https://image.tmdb.org/t/p/w185/${movieDetails.posterPath}`} alt={movieDetails.title} />
            </div>
            <div className="movie-description">
              <h4>Plot:</h4>
              <p>{movieDetails.overview}</p>
              <h4>Cast:</h4>
              <ul>
                {movieDetails.actors.map((actor, index) => (
                  <li key={index}>{actor.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando detalles de la película...</p>
      )}
    </div>
  );  
}