import useDeleteData from "../../Hooks/useDeleteData";
import { useGetData } from "../../Hooks/useGetData";
import { useInsertDataWithImage } from "../../Hooks/useInsertData";
import { useUpdateDataWithImage } from "../../Hooks/useUpdateData";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_PAGE,
  GET_ERROR,
  GET_PRODUCT,
  GET_PRODUCTS_BRAND,
  GET_PRODUCTS_CATEGORY,
  GET_RELATED_PRODUCTS,
  UPDATE_PRODUCT,
} from "../type";

export const createProduct = (formData) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useInsertDataWithImage(`/api/v1/products`, formData);
    console.log(response);
    dispatch({
      type: CREATE_PRODUCT,
      payload: response,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: CREATE_PRODUCT,
      payload: e.response,
    });
  }
};
export const getAllProducts = (limit) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");

    const response = await useGetData(`/api/v1/products?limit=${limit}`);

    dispatch({
      type: GET_ALL_PRODUCTS,
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
export const getProductDetails = (id) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");

    const response = await useGetData(`/api/v1/products/${id}`);
    // console.log(response);
    dispatch({
      type: GET_PRODUCT,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: GET_PRODUCT,
      payload: e.response,
    });
  }
};

export const getRelatedProducts = (id) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");

    const response = await useGetData(`/api/v1/products?category=${id}`);

    dispatch({
      type: GET_RELATED_PRODUCTS,
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
// delete product with id
export const deleteProduct = (id) => async (dispatch) => {
  try {
    const response = await useDeleteData(`/api/v1/products/${id}`);

    dispatch({
      type: DELETE_PRODUCT,
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

export const getAllProductsPage = (page) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useGetData(`/api/v1/products?limit=9&page=${page}`);

    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: "error" + error,
    });
  }
};

export const getAllProductsSearch = (queryString) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useGetData(`/api/v1/products?${queryString}`);

    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: "error" + error,
    });
  }
};
export const updateProduct = (id, data) => async (dispatch) => {
  try {
    const response = await useUpdateDataWithImage(
      `/api/v1/products/${id}`,
      data
    );

    dispatch({
      type: UPDATE_PRODUCT,
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

export const getProductsByCategory = (id, limit, page) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useGetData(
      `/api/v1/products?limit=${limit}&page=${page}&category=${id}`
    );

    dispatch({
      type: GET_PRODUCTS_CATEGORY,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_PRODUCTS_CATEGORY,
      payload: e.response,
    });
  }
};
export const getProductsByBrand = (id, limit, page) => async (dispatch) => {
  try {
    const response = await useGetData(
      `/api/v1/products?limit=${limit}&page=${page}&brand=${id}`
    );

    dispatch({
      type: GET_PRODUCTS_BRAND,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_PRODUCTS_BRAND,
      payload: e.response,
    });
  }
};
