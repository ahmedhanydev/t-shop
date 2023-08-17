import useDeleteData from "../../Hooks/useDeleteData";
import { useGetDataWithToken } from "../../Hooks/useGetData";
import { useInsertData } from "../../Hooks/useInsertData";
import { useUpdateData } from "../../Hooks/useUpdateData";
import {
  ADD_TO_CART,
  APPLY_COUPON_CART,
  CLEAR_USER_CART,
  DELETE_CART_ITEM,
  GET_USER_CART,
  UPDATE_CART_ITEM,
} from "../type";

export const addProductToCart = (data) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useInsertData(`/api/v1/cart`, data);

    dispatch({
      type: ADD_TO_CART,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: ADD_TO_CART,
      payload: e.response,
    });
  }
};

export const getUserCart = () => async (dispatch) => {
  try {
    const response = await useGetDataWithToken(`/api/v1/cart`);
    // console.log(response);
    dispatch({
      type: GET_USER_CART,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_USER_CART,
      payload: e.response,
    });
  }
};
export const clearUserCart = () => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/cart`);

    dispatch({
      type: CLEAR_USER_CART,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: CLEAR_USER_CART,
      payload: e.response,
    });
  }
};
export const deleteCartItem = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/cart/${id}`);

    dispatch({
      type: DELETE_CART_ITEM,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: DELETE_CART_ITEM,
      payload: e.response,
    });
  }
};

export const updateCartItem = (id, data) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/cart/${id}`, data);

    dispatch({
      type: UPDATE_CART_ITEM,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_CART_ITEM,
      payload: e.response,
    });
  }
};
export const applyCouponCart = (data) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/cart/applyCoupon`, data);

    dispatch({
      type: APPLY_COUPON_CART,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: APPLY_COUPON_CART,
      payload: e.response,
    });
  }
};
