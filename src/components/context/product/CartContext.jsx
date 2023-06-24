/** @format */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Axios } from '../../Api/Axios';
import { useAuth } from '../../util/AuthContext';

const CartContext = createContext({
  products: [],
  cartItems: [],
  isLoading: false,
  checkOut: async (values) => {},
  addToCart: async (values,_id) => {},
  checkOutError: null,
});

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [checkOutError, setCheckOutError] = useState('');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await Axios.get('/products', {
          Headers: {
            Authorization: `Bearer ${token?.accessToken}`,
          },
        });
        const responseData = response.data;

        setProducts(responseData);
        setIsLoading(false);

        console.log(responseData);

        return responseData;
      } catch (error) {
        console.log('Error retrieving products:', error.message);
      }
    };

    getProducts();
  }, [token?.accessToken]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await Axios.get('/cart', { headers: { Authorization: `Bearer ${token?.accessToken}` } });
        const data = response.data;

        setIsLoading(false);
        setCartItems(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCartItems();
  }, [token?.accessToken]);

  const addToCart = async (values,_id) => {
    try {
      const response = await Axios.post(`/cart/${_id}`, values, { headers: { Authorization: `Bearer ${token?.accessToken}` } });
      const data = response.data;

      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkOut = async (values) => {
    try {
      const response = await Axios.post('/orders', values, { headers: { Authorization: `Bearer ${token?.accessToken}` } });
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
        cartItems,
        addToCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
