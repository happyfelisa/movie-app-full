import React, { useState, useEffect } from 'react';
import { Playlist } from '../Playlist/Playlist';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';
import { useQuery ,gql ,useMutation } from "@apollo/client";

export const PLAYLIST_QUERY = gql`
query{
  playlists{
    id
    name
    userId
    movies{
      id
      title
      posterPath
    }
  }
}
`;

export const Dashboard = () => {
  const [playlistss, setPlaylistss] = useState([]);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("userId"))
  console.log(userId)

  const handleClick = () => {
    navigate('/new-playlist')
  }

  const handleLogOut = () => {
    localStorage.removeItem("userId")
    navigate('/login')
  }



  const {data} = useQuery( PLAYLIST_QUERY);

  useEffect(() => {
      if (data) {
        setPlaylistss(data.playlists)
      }
  }, [data]);
  

  console.log(playlistss);
  console.log('DATA',data);

  let playlistsFiltered = [];
  if (playlistss) {
    playlistsFiltered = playlistss.filter((pl) => pl.userId === +userId)
  }

  const DELETE_PLAYLIST_QUERY = gql`
  mutation removePlaylist($id: ID!){
    removePlaylist(removePlaylistInput: {id: $id}){
      name
    }
  }
  `;

// eslint-disable-next-line
  const [deletePlaylist, { error }] = useMutation(DELETE_PLAYLIST_QUERY,{
    refetchQueries: [
      { query: PLAYLIST_QUERY },
    ]

  });
  

  return (
    <div className="dashboard-container">
      <h1>Mis Listas de Reproducción</h1>
      <div className="button-container">
        <button onClick={handleClick}>Nueva Playlist</button>
        <button onClick={handleLogOut}>Salir</button>
      </div>
      <div className="playlists">
        {playlistsFiltered.map(playlist => (
          <div className="playlist-container" key={playlist.id}>
            <h2>{playlist.name}</h2>
            <div className="playlist">
              <Playlist playlist={playlist} />
              <form onSubmit={(e) => {
                e.preventDefault();
                console.log(playlist.id, typeof (playlist.id))
                alert(`Playlist ${playlist.name} eliminada`)
                deletePlaylist({
                  variables: {
                    id: +playlist.id,
                  }
                })
              }}>
                <button type='submit' >Eliminar lista de reproducción</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


