import { useGetDataWithToken } from "../../Hooks/useGetData";
import { useInsertData } from "../../Hooks/useInsertData";
import { useUpdateData } from "../../Hooks/useUpdateData";
import {
  GET_ALL_ORDERS,
  GET_ONE_ORDER,
  UPDATE_ORDER_DELIVER,
  UPDATE_ORDER_PAY,
} from "../type";

export const getAllOrders = (page, limit) => async (dispatch) => {
  try {
    const response = await useGetDataWithToken(
      `/api/v1/orders?limit=${limit}&page=${page}`
    );

    dispatch({
      type: GET_ALL_ORDERS,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_ORDERS,
      payload: e.response,
    });
  }
};
export const getOneOrder = (id) => async (dispatch) => {
  try {
    const response = await useGetDataWithToken(`/api/v1/orders/${id}`);

    dispatch({
      type: GET_ONE_ORDER,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_ONE_ORDER,
      payload: e.response,
    });
  }
};
export const updateOrderPay = (id) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/orders/${id}/pay`);

    dispatch({
      type: UPDATE_ORDER_PAY,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_ORDER_PAY,
      payload: e.response,
    });
  }
};
export const updateOrderDeliver = (id) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/orders/${id}/deliver`);

    dispatch({
      type: UPDATE_ORDER_DELIVER,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_ORDER_DELIVER,
      payload: e.response,
    });
  }
};
