import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from '../actions/actions';

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { _id, quantity, product } = action.payload;
      let tempItem = Array.isArray(state.cart) && state.cart.find((item) => item._id === _id);
      if (tempItem) {
        const tempCart =
          Array.isArray(state.cart) &&
          state.cart.map((item) => {
            if (item._id === _id) {
              let newQuantity = item.quantity + quantity;
              return { ...item, quantity: newQuantity };
            } else return item;
          });
        return { ...state, cart: tempCart };
      } else {
        let newCartItem = {
          id: new Date().getTime().toString(32) + new Date().getUTCMilliseconds(),
          name: product.name,
          quantity,
          image: product.images[0].url,
          price: product.price,
        };
        return { ...state, cart: [...state.cart, newCartItem] };
      }
    case REMOVE_FROM_CART:
      const cartItem = Array.isArray(state.cart) && state.cart.filter((item) => item._id !== action.payload);
      return { ...state, cart: cartItem };
    case CLEAR_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};
export default cart_reducer;
