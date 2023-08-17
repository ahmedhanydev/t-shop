import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, USER_WISHLIST } from "../type";

const initial = {
  addToWishlist: [],
  removeFromWishlist: [],
  userWishlist: [],
};

const wishlistReducer = (state = initial, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return {
        ...state,
        addToWishlist: action.payload,
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        removeFromWishlist: action.payload,
      };
    case USER_WISHLIST:
      return {
        ...state,
        userWishlist: action.payload,
      };

    default:
      return state;
  }
};

export default wishlistReducer;
