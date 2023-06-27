/** @format */

import axios from 'axios';

export const Axios = axios.create({
  // baseURL: 'http://localhost:4000/api/v1',
  baseURL: "https://cart-product-api.onrender.com",
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

Axios.interceptors.request.use(
  (config) => {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    const accessToken = tokens?.accessToken; // use optional chaining to avoid TypeError
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      const newTokens = await axios.post('/users/auth/access', { refreshToken: tokens?.refreshToken });
      localStorage.setItem('tokens', JSON.stringify(newTokens));
    }
    return;
  }
);

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const tokens = JSON.parse(localStorage.getItem('tokens'));
      const newTokens = await axios.post('/users/auth/refresh', { refreshToken: tokens?.refreshToken });
      localStorage.setItem('tokens', JSON.stringify(newTokens));
    }
    return;
  }
);