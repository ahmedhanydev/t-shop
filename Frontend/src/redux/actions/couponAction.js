import { useGetDataWithToken } from "../../Hooks/useGetData";
import { useInsertData } from "../../Hooks/useInsertData";
import { useUpdateData } from "../../Hooks/useUpdateData";
import {
  ADD_COUPON,
  ALL_COUPON,
  DELETE_COUPON,
  ONE_COUPON,
  UPDATE_COUPON,
} from "../type";
import useDeleteData from "./../../Hooks/useDeleteData";

export const addCoupon = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/coupons`, data);

    dispatch({
      type: ADD_COUPON,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: ADD_COUPON,
      payload: e.response,
    });
  }
};
export const getAllCoupon = () => async (dispatch) => {
  try {
    const response = await useGetDataWithToken(`/api/v1/coupons`);

    dispatch({
      type: ALL_COUPON,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: ALL_COUPON,
      payload: e.response,
    });
  }
};
export const deleteCoupon = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/coupons/${id}`);

    dispatch({
      type: DELETE_COUPON,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: DELETE_COUPON,
      payload: e.response,
    });
  }
};
export const getOneCoupon = (id) => async (dispatch) => {
  try {
    const response = await useGetDataWithToken(`/api/v1/coupons/${id}`);

    dispatch({
      type: ONE_COUPON,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: ONE_COUPON,
      payload: e.response,
    });
  }
};

export const updateCoupon = (id, data) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/coupons/${id}`, data);

    dispatch({
      type: UPDATE_COUPON,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_COUPON,
      payload: e.response,
    });
  }
};
