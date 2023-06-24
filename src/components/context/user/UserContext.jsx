/** @format */

import React, { useContext, createContext, useEffect } from 'react';
import { useAuth } from '../../util/AuthContext';
import { Axios } from '../../Api/Axios';

const UserContext = createContext({
  user: null,
  token: null,
});

export const UserProvider = ({ children }) => {
  const { user, token, setUser } = useAuth();

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await Axios.get('/users/auth/me', {
          headers: {
            Authorization: `Bearer ${token?.accessToken}`,
          },
        });
        setUser(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
    fetchMe();
  }, [token?.accessToken, setUser]);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
