import {
  ADD_ADDRESS,
  ALL_ADDRESS,
  DELETE_ADDRESS,
  ONE_ADDRESS,
  UPDATE_ADDRESS,
} from "../type";

const initial = {
  addAddress: [],
  allAddress: [],
  updateAddress: [],
  oneAddress: [],
  deleteAddress: [],
};

const addressReducer = (state = initial, action) => {
  switch (action.type) {
    case ADD_ADDRESS:
      return {
        ...state,
        addAddress: action.payload,
      };
    case ALL_ADDRESS:
      return {
        ...state,
        allAddress: action.payload,
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        updateAddress: action.payload,
      };
    case ONE_ADDRESS:
      return {
        ...state,
        oneAddress: action.payload,
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        deleteAddress: action.payload,
      };

    default:
      return state;
  }
};

export default addressReducer;
