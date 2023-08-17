import useDeleteData from "../../Hooks/useDeleteData";
import { useGetDataWithToken } from "../../Hooks/useGetData";
import { useInsertData } from "../../Hooks/useInsertData";
import { useUpdateData } from "../../Hooks/useUpdateData";
import { ADD_ADDRESS, ALL_ADDRESS, DELETE_ADDRESS, ONE_ADDRESS, UPDATE_ADDRESS } from "../type";

export const addAddress = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/addresses`, data);

    dispatch({
      type: ADD_ADDRESS,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: ADD_ADDRESS,
      payload: e.response,
    });
  }
};

export const getAllAddresses = () => async (dispatch) => {
  try {
    const response = await useGetDataWithToken(`/api/v1/addresses`);

    dispatch({
      type: ALL_ADDRESS,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: ALL_ADDRESS,
      payload: e.response,
    });
  }
};
export const getOneAddress = (id) => async (dispatch) => {
  try {
    const response = await useGetDataWithToken(`/api/v1/addresses/${id}`);

    dispatch({
      type: ONE_ADDRESS,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: ONE_ADDRESS,
      payload: e.response,
    });
  }
};
export const updateAddress = (id, data) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/addresses/${id}`, data);

    dispatch({
      type: UPDATE_ADDRESS,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_ADDRESS,
      payload: e.response,
    });
  }
};

export const deleteAddress = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/addresses/${id}`);

    dispatch({
      type: DELETE_ADDRESS,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: DELETE_ADDRESS,
      payload: e.response,
    });
  }
};
