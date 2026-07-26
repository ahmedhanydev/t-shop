import {
  ADD_COUPON,
  ALL_COUPON,
  DELETE_COUPON,
  ONE_COUPON,
  UPDATE_COUPON,
} from "../type";

const initial = {
  addCoupon: [],
  allCoupon: [],
  deleteCoupon: [],
  oneCoupon: [],
  updateCoupon: [],
};

const couponReducer = (state = initial, action) => {
  switch (action.type) {
    case ADD_COUPON:
      return {
        ...state,
        addCoupon: action.payload,
      };
    case ALL_COUPON:
      return {
        ...state,
        allCoupon: action.payload,
      };
    case DELETE_COUPON:
      return {
        ...state,
        deleteCoupon: action.payload,
      };
    case ONE_COUPON:
      return {
        ...state,
        oneCoupon: action.payload,
      };
    case UPDATE_COUPON:
      return {
        ...state,
        updateCoupon: action.payload,
      };

    default:
      return state;
  }
};

export default couponReducer;
