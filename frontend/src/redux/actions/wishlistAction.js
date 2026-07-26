import { useGetDataWithToken } from "../../Hooks/useGetData";
import { useInsertData } from "../../Hooks/useInsertData";

import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, USER_WISHLIST } from "../type";
import useDeleteData from "./../../Hooks/useDeleteData";

export const addProductToWishlist = (data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/wishlist`, data);

    dispatch({
      type: ADD_TO_WISHLIST,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: e.response,
    });
  }
};

export const removeProductFromWishlist = (prodID) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/wishlist/${prodID}`);

    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: e.response,
    });
  }
};

export const getUserWishlist = () => async (dispatch) => {
  try {
    const response = await useGetDataWithToken(`/api/v1/wishlist/`);

    dispatch({
      type: USER_WISHLIST,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: USER_WISHLIST,
      payload: e.response,
    });
  }
};
