import {
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCT_ERROR,
} from '../actions/actions';

const product_reducer = (state, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      const featured = action.payload.filter((item) => item.featured === true);
      return {
        ...state,
        featured,
        products: action.payload,
        products_isLoading: false,
      };
    case FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
        product_isLoading: false,
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        products_error_msg: action.payload,
        products_isLoading: true,
      };
    case FETCH_PRODUCT_ERROR:
      return {
        ...state,
        product_error_msg: action.payload,
        product_isLoading: true,
      };
    default:
      return state;
  }
};

export default product_reducer;
