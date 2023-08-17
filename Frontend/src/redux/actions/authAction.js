import { useGetDataWithToken } from "../../Hooks/useGetData";
import { useInsertData } from "../../Hooks/useInsertData";
import { useUpdateData } from "../../Hooks/useUpdateData";
import {
  CREATE_USER,
  FORGET_PASSWORD,
  GET_LOGGED_USER,
  LOGIN_USER,
  RESET_PASSWORD,
  VERIFY_PASSWORD,
} from "../type";

export const createUser = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/signup`, data);

    dispatch({
      type: CREATE_USER,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: CREATE_USER,
      payload: e.response,
    });
  }
};
export const loginUser = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/login`, data);

    dispatch({
      type: LOGIN_USER,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: LOGIN_USER,
      payload: e.response,
    });
  }
};

export const getLoggedUser = () => async (dispatch) => {
  try {
    const response = await useGetDataWithToken(`/api/v1/users/getMe`);

    dispatch({
      type: GET_LOGGED_USER,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_LOGGED_USER,
      payload: e.response,
    });
  }
};

export const forgetPassword = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/forgotPassword`, data);

    dispatch({
      type: FORGET_PASSWORD,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: FORGET_PASSWORD,
      payload: e.response,
    });
  }
};
export const verifyPassword = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/auth/verifyResetCode`, data);

    dispatch({
      type: VERIFY_PASSWORD,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: VERIFY_PASSWORD,
      payload: e.response,
    });
  }
};
export const resetPassword = (data) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/auth/resetPassword`, data);

    dispatch({
      type: RESET_PASSWORD,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: RESET_PASSWORD,
      payload: e.response,
    });
  }
};
