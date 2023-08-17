import { useUpdateData } from "../../Hooks/useUpdateData";
import { UPDATE_USER } from "../type";
import { UPDATE_USER_PASSWORD } from "./../type";

export const updateMyData = (data) => async (dispatch) => {
  try {
    const response = await useUpdateData(`/api/v1/users/updateMyData`, data);

    dispatch({
      type: UPDATE_USER,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_USER,
      payload: e.response,
    });
  }
};
export const updateUserPassword = (data) => async (dispatch) => {
  try {
    const response = await useUpdateData(
      `/api/v1/users/changeMyPassword`,
      data
    );

    dispatch({
      type: UPDATE_USER_PASSWORD,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: UPDATE_USER_PASSWORD,
      payload: e.response,
    });
  }
};
