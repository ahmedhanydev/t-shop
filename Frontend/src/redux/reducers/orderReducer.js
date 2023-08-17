import {
  GET_ALL_ORDERS,
  GET_ONE_ORDER,
  UPDATE_ORDER_DELIVER,
  UPDATE_ORDER_PAY,
} from "../type";

const initial = {
  allOrders: [],
  oneOrder: [],
  orderPay: [],
  orderDeliver: [],
};

const orderReducer = (state = initial, action) => {
  switch (action.type) {
    case GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload,
      };
    case GET_ONE_ORDER:
      return {
        ...state,
        oneOrder: action.payload,
      };
    case UPDATE_ORDER_PAY:
      return {
        ...state,
        orderPay: action.payload,
      };
    case UPDATE_ORDER_DELIVER:
      return {
        ...state,
        orderDeliver: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
