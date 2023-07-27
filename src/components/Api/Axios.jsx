/** @format */

import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  // baseURL: 'https://cart-product-api.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

Axios.interceptors.request.use(
  (config) => {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    const accessToken = tokens?.accessToken; // use optional chaining to avoid TypeError
    const refreshToken = tokens?.refreshToken; // use optional chaining to avoid TypeError;

    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    if (refreshToken) config.headers['x-refresh'] = `Bearer ${refreshToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
