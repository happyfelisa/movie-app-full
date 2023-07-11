import React, { createContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export const Auth = createContext(null);

function AuthContext({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function refreshUser(user) {
    const usuarioJSON = await fetch( process.env.REACT_APP_PORT_3001_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.username,
        password: localStorage.getItem('password'),
      }),
    });

    const usuario = await usuarioJSON.json();
    setUser(usuario);
    localStorage.setItem('username', JSON.stringify(user));
  }

  function login(user) {
    setUser(user);
    localStorage.setItem('username', JSON.stringify(user));
    // Navegar dependiendo del tipo
    navigate('/dashboard');
    
  }

  function logout() {
    localStorage.clear();
    setUser(null);
    navigate('/');
  }

  // Cuando se refresque la pagina
  useEffect(() => {
    // Obtener el objeto user desde el almacenamiento
    const userJSON = localStorage.getItem('username');
    if (userJSON) {
      const savedUser = JSON.parse(userJSON);
      refreshUser(savedUser);
    }
  }, []);

  // Variables y funciones globales
  const contextValue = useMemo(() => {
    return {
      user,
      setUser,
      login,
      logout,
    };
  }, [user]);

  // Provee el estado a todos sus hijos (ver App.js)
  return <Auth.Provider value={contextValue}>{children}</Auth.Provider>;
}

AuthContext.propTypes = {
  children: PropTypes.func,
};

export default AuthContext;