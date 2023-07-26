import React, { useReducer, useContext, createContext, useEffect } from 'react';
import { FETCH_PRODUCT, FETCH_PRODUCTS, FETCH_PRODUCTS_ERROR, FETCH_PRODUCT_ERROR } from '../../actions/actions';
import product_reducer from '../../reducers/product_reducer';
import { Axios } from '../../Api/Axios';

const ProductContext = createContext({});

const initialState = {
  products: [],
  product: {},
  products_isLoading: true,
  product_isLoading: true,
  products_error_msg: '',
  product_error_msg: '',
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(product_reducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Axios.get('/products');
        dispatch({ type: FETCH_PRODUCTS, payload: response.data });
        return response;
      } catch (error) {
        console.log(error);
        dispatch({ type: FETCH_PRODUCTS_ERROR, payload: error.response });
      }
    };
    fetchProducts();
  }, []);

  const fetchSingleProduct = async (url) => {
    try {
      const response = await Axios.get(url);
      dispatch({ type: FETCH_PRODUCT, payload: response.data });
      return response;
    } catch (error) {
      dispatch({ type: FETCH_PRODUCT_ERROR, payload: error.response });
    }
  };

  return <ProductContext.Provider value={{ ...state, fetchSingleProduct }}>{children}</ProductContext.Provider>;
};

const useProduct = () => {
  return useContext(ProductContext);
};
export default useProduct;
