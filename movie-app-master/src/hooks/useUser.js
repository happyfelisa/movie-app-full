import { useContext } from 'react';
import { Auth } from '../context/authContext';

export default function useUser() {
  const { user, setUser, login, logout } = useContext(Auth);
  return {
    user,
    setUser,
    login,
    logout,
  };
}