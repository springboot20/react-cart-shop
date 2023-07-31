/** @format */

import React, { useContext, createContext, useReducer, useState, useEffect } from 'react';
import { Axios } from '../Api/Axios';
import auth_reducer from '../reducers/auth_reducer';
import jwt_decode from 'jwt-decode';
import { SIGNUP, SIGNIN, LOGOUT, SIGNIN_ERROR, SIGNUP_ERROR, LOGOUT_ERROR } from '../actions/actions';

const AuthContext = createContext({});

function getLocalUser() {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
}
function token() {
  return localStorage.getItem('tokens') ? JSON.parse(localStorage.getItem('tokens')) : null;
}
function auth() {
  return localStorage.getItem('accessToken') ? jwt_decode(localStorage.getItem('accessToken')) : null;
}

const initialState = {
  isLoggedIn: false,
  user: getLocalUser(),
  auth: auth(),
  tokens: token(),
  signupMsg: '',
  signinMsg: '',
  signupErrMsg: '',
  signinErrMsg: '',
  logoutErrMsg: '',
  logoutMsg: '',
};

function isTokenExpire(arg) {
  let currentTime = Math.floor(new Date() / 1000);
  if (arg.exp) {
    return currentTime >= arg.exp;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(auth_reducer, initialState);
  const [isTokenExpired, setIsTokenExpired] = useState(isTokenExpire(auth()));
  const signUp = async (newUser) => {
    try {
      const response = await Axios.post('/users/auth/signup', newUser);
      dispatch({ type: SIGNUP, payload: response.data });
    } catch (error) {
      dispatch({ type: SIGNUP_ERROR, payload: error.response.data });
    }
  };
  const signIn = async (email, password) => {
    try {
      const response = await Axios.post('/users/auth/signin', {
        email,
        password,
      });
      dispatch({ type: SIGNIN, payload: response.data });

      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('tokens', JSON.stringify(response.data.tokens));
      localStorage.setItem('accessToken', JSON.stringify(response.data.tokens.accessToken));

      return response;
    } catch (error) {
      dispatch({ type: SIGNIN_ERROR, payload: error.response.data });
    }
  };

  const logOut = async () => {
    try {
      const response = await Axios.post('/users/auth/logout');
      dispatch({ type: LOGOUT, payload: response.data });

      localStorage.removeItem('user');
      localStorage.removeItem('tokens');
      localStorage.removeItem('accessToken');
    } catch (error) {
      dispatch({ type: LOGOUT_ERROR, payload: error.response });
    }
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const decodedTokenPayload = auth();
      if (decodedTokenPayload) {
        if (isTokenExpire(decodedTokenPayload)) {
          setIsTokenExpired(true);
        }
      }
    };
    const intervalId = setInterval(checkTokenExpiration, 1000);

    return () => clearInterval(intervalId);
  });

  console.log(state.isLoggedIn);
  console.log(state.user);
  console.log(state.auth);
  console.log(`log from line 98 : ${isTokenExpired}`);

  return (
    <AuthContext.Provider value={{ ...state, signUp, signIn, logOut, isTokenExpired }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
