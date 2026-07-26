import {
  ADD_TO_CART,
  APPLY_COUPON_CART,
  CLEAR_USER_CART,
  DELETE_CART_ITEM,
  GET_USER_CART,
  UPDATE_CART_ITEM,
} from "../type";

const initial = {
  addToCart: [],
  userCart: [],
  clearUserCart: [],
  deleteCartItem: [],
  updateCartItem: [],
  applyCouponCart: [],
};

const cartReducer = (state = initial, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        addToCart: action.payload,
      };
    case GET_USER_CART:
      return {
        ...state,
        userCart: action.payload,
      };
    case CLEAR_USER_CART:
      return {
        ...state,
        clearUserCart: action.payload,
      };
    case DELETE_CART_ITEM:
      return {
        ...state,
        deleteCartItem: action.payload,
      };
    case UPDATE_CART_ITEM:
      return {
        ...state,
        updateCartItem: action.payload,
      };
    case APPLY_COUPON_CART:
      return {
        ...state,
        applyCouponCart: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
