import baseURL from "../../Api/BaseURL";
import { useGetData } from "../../Hooks/useGetData";
import { useInsertDataWithImage } from "../../Hooks/useInsertData";
import { GET_ALL_BRAND, GET_ERROR, CREATE_BRAND, GET_BRAND } from "../type";

export const getAllBrand = (limit) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useGetData(`/api/v1/brands?limit=${limit}`);

    dispatch({
      type: GET_ALL_BRAND,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: "error" + error,
    });
  }
};
export const getAllBrandPage = (page) => async (dispatch) => {
  try {
    const response = await useGetData(`/api/v1/brands?limit=2&page=${page}`);

    dispatch({
      type: GET_ALL_BRAND,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: "error" + error,
    });
  }
};
export const getOneBrand = (id) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useGetData(`/api/v1/brands/${id}`);

    dispatch({
      type: GET_BRAND,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: "error" + error,
    });
  }
};

export const createBrand = (formData) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useInsertDataWithImage(`/api/v1/brands`, formData);

    dispatch({
      type: CREATE_BRAND,
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
