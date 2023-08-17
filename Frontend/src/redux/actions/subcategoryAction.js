import { useGetData } from "../../Hooks/useGetData";
import { useInsertData } from "../../Hooks/useInsertData";
import { CREATE_SUBCATEGORY, GET_ERROR, GET_SUBCATEGORY } from "../type";

export const createSubcategory = (data) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useInsertData(`/api/v1/subcategories`, data);

    dispatch({
      type: CREATE_SUBCATEGORY,
      payload: response,
      loading: true,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: "error" + error,
    });
  }
};
export const getSubCategories = (id) => async (dispatch) => {
  try {
    // const res = await baseURL.get("/api/v1/categories");
    const response = await useGetData(`/api/v1/categories/${id}/subcategories`);

    dispatch({
      type: GET_SUBCATEGORY,
      payload: response,
      loading: true,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: "error" + error,
    });
  }
};
