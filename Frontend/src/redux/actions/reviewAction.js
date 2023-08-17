import useDeleteData from "../../Hooks/useDeleteData";
import { useGetDataWithToken } from "../../Hooks/useGetData";
import { useInsertData } from "../../Hooks/useInsertData";
import { useUpdateData } from "../../Hooks/useUpdateData";
import {
  All_REVIEW_PRODUCT,
  CREATE_REVIEW,
  DELETE_REVIEW,
  UPDATE_REVIEW,
} from "./../type";

export const createReview = (prodID, data) => async (dispatch) => {
  try {
    const response = await useInsertData(
      `/api/v1/products/${prodID}/reviews`,
      data
    );

    dispatch({
      type: CREATE_REVIEW,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: CREATE_REVIEW,
      payload: e.response,
    });
  }
};
export const getAllReviewProduct =
  (prodID, page, limit) => async (dispatch) => {
    try {
      const response = await useGetDataWithToken(
        `/api/v1/products/${prodID}/reviews?page=${page}&limit=${limit}`
      );

      dispatch({
        type: All_REVIEW_PRODUCT,
        payload: response.data,
        loading: true,
      });
    } catch (e) {
      dispatch({
        type: All_REVIEW_PRODUCT,
        payload: e.response,
      });
    }
  };

export const deleteReview = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/reviews/${id}`);

    dispatch({
      type: DELETE_REVIEW,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: DELETE_REVIEW,
      payload: e.response,
    });
  }
};

export const updateReview = (id, data) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/reviews/${id}`, data);

    dispatch({
      type: UPDATE_REVIEW,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_REVIEW,
      payload: e.response,
    });
  }
};
