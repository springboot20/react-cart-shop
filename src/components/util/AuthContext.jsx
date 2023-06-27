/** @format */

import React, { useContext, createContext, useState } from 'react';
import { Axios } from '../Api/Axios';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext({
  auth: {},
  token: null,
  isLoggedIn: false,
  signUpError: null,
  signInError: null,
  signUp: async (newUser) => {},
  signIn: async (email, password) => {},
  logOut: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => (localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null));
  const [auth, setAuth] = useState(localStorage.getItem('tokens') ? jwt_decode(localStorage.getItem('tokens')) : null);
  const [signUpError, setSignUpError] = useState('');
  const [signInError, setSignInError] = useState('');

  const signUp = async (newUser) => {
    try {
      const response = await Axios.post('/users/signup', newUser);
      return response.data;
    } catch (error) {
      setSignUpError(error.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await Axios.post('/users/signin', {
        email,
        password,
      });

      setAuth(response.data.accessToken);
      setToken(response.data);

      localStorage.setItem('tokens', JSON.stringify(response.data));
    } catch (error) {
      if (error) {
        setSignInError(error.message);
      }
    }
  };

  const logOut = async () => {
    try {
      const response = await Axios.post('/users/auth/logout', { refreshToken: token?.refreshToken });
      setToken(null);
      setAuth(null);

      localStorage.clear();
      return response.data;
    } catch (error) {
      if (error) {
        console.log(error.message);
      }
    }
  };

  return <AuthContext.Provider value={{ auth, token, signInError, signUpError, signUp, signIn, logOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
