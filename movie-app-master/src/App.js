import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './Login/Login.js';
import { Dashboard } from './Dashboard/Dashboard.js';
import { Playlist } from "./Playlist/Playlist";
import { MovieDetail } from './MovieDetail/MovieDetail.js';
import { EditPlaylist } from './EditPlaylist/EditPlaylist';
import { NewPlaylist } from './NewPlaylist/NewPlaylist.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/playlist/:id" element={<Playlist/>} />
        <Route path="/movie/:id" element={<MovieDetail/>} />
        <Route path="/edit-playlist/:id" element={<EditPlaylist/>} />
        <Route path="/new-playlist" element={<NewPlaylist/>} />
      </Routes>
    </Router>
  );
}

export default App;
