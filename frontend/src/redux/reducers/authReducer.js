import {
  CREATE_USER,
  FORGET_PASSWORD,
  GET_LOGGED_USER,
  LOGIN_USER,
  RESET_PASSWORD,
  VERIFY_PASSWORD,
} from "../type";

const initial = {
  newUser: [],
  loggedUser: [],
  userData: [],
  forgetPassword: [],
  verifyPassword: [],
  resetPassword: [],

  loading: true,
};

const authReducer = (state = initial, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        newUser: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        loggedUser: action.payload,
      };
    case GET_LOGGED_USER:
      return {
        ...state,
        userData: action.payload,
      };
    case FORGET_PASSWORD:
      return {
        ...state,
        forgetPassword: action.payload,
      };
    case VERIFY_PASSWORD:
      return {
        ...state,
        verifyPassword: action.payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetPassword: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
