import { CREATE_ORDER_CARD, CREATE_ORDER_CASH } from "../type";

const initial = {
  orderCash: [],
  orderCard: [],
};

const checkoutReducer = (state = initial, action) => {
  switch (action.type) {
    case CREATE_ORDER_CASH:
      return {
        ...state,
        orderCash: action.payload,
      };
    case CREATE_ORDER_CARD:
      return {
        ...state,
        orderCard: action.payload,
      };

    default:
      return state;
  }
};

export default checkoutReducer;
