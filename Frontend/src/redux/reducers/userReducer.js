import { UPDATE_USER, UPDATE_USER_PASSWORD } from "../type";

const initial = {
  updateUser: [],
  updateUserPassword: [],
};

const userReducer = (state = initial, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        updateUser: action.payload,
      };
    case UPDATE_USER_PASSWORD:
      return {
        ...state,
        updateUserPassword: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
