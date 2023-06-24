/** @format */

import React, { useContext, createContext, useEffect, useState } from 'react';
import { useAuth } from '../../util/AuthContext';
import { Axios } from '../../Api/Axios';

const UserContext = createContext({
  user: {},
  token: {},
});

export const UserProvider = ({ children }) => {
  const { token } = useAuth();
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchMe() {
      try {
        const response = await Axios.get('/users/auth/me', {
          headers: {
            Authorization: `Bearer ${token?.accessToken}`,
          },
        });
        setUser(response.data);
        setIsLoggedIn(true);

        return response.data;
      } catch (error) {
        setIsLoggedIn(false);
        console.log(error);
      }
    }
    fetchMe();
  }, [token?.accessToken, setUser]);

  return <UserContext.Provider value={{ user, isLoggedIn }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  return useContext(UserContext);
};
