import baseURL from "../../Api/BaseURL";
import { useGetData } from "../../Hooks/useGetData";
import { useInsertDataWithImage } from "../../Hooks/useInsertData";
import {
  GET_ALL_CATEGORY,
  GET_ERROR,
  CREATE_CATEGORY,
  GET_CATEGORY,
} from "../type";

export const getAllCategory = (limit) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useGetData(`/api/v1/categories?limit=${limit}`);

    dispatch({
      type: GET_ALL_CATEGORY,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_ALL_CATEGORY,
      payload: e.response,
    });
  }
};
export const getAllCategoryPage = (page) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useGetData(
      `/api/v1/categories?limit=10&page=${page}`
    );

    dispatch({
      type: GET_ALL_CATEGORY,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: "error" + error,
    });
  }
};
export const getOneCategory = (id) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useGetData(`/api/v1/categories/${id}`);

    dispatch({
      type: GET_CATEGORY,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: "error" + error,
    });
  }
};

export const createCategory = (formData) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useInsertDataWithImage(
      `/api/v1/categories`,
      formData
    );

    dispatch({
      type: CREATE_CATEGORY,
      payload: response.data,
      loading: true,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: "error" + error,
    });
  }
};
