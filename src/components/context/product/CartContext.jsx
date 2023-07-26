/** @format */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Axios } from '../../Api/Axios';
import { useAuth } from '../../util/AuthContext';

const CartContext = createContext({
  products: [],
  cartItems: [],
  isLoading: false,
  checkOut: async (values) => {},
  checkOutError: null,
});

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [checkOutError, setCheckOutError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await Axios.get('/products');
        const responseData = response.data;

        setProducts(responseData);
        setIsLoading(false);

        console.log(responseData);

        return responseData;
      } catch (error) {
        console.log('Error retrieving products:', error.message);
      }
    })();
  }, [token?.accessToken]);

  const checkOut = async (values) => {
    try {
      const response = await Axios.post('/', values);
      const data = response.data;
      return data;
    } catch (error) {
      setCheckOutError(error.message);
    }
  };

  return (
    <CartContext.Provider
      value={{
        products,
        isLoading,
        checkOut,
        checkOutError,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
