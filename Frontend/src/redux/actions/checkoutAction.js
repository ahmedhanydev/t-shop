import { useGetDataWithToken } from "../../Hooks/useGetData";
import { useInsertData } from "../../Hooks/useInsertData";
import { CREATE_ORDER_CARD, CREATE_ORDER_CASH } from "../type";

export const createOrderCash = (id, data) => async (dispatch) => {
  try {
    const response = await useInsertData(`/api/v1/orders/${id}`, data);

    dispatch({
      type: CREATE_ORDER_CASH,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: CREATE_ORDER_CASH,
      payload: e.response,
    });
  }
};
export const createOrderCard = (id, data) => async (dispatch) => {
  try {
    const response = await useGetDataWithToken(
      `/api/v1/orders/checkout-session/${id}`,
      data
    );

    dispatch({
      type: CREATE_ORDER_CARD,
      payload: response.data,
      loading: true,
    });
  } catch (e) {
    dispatch({
      type: CREATE_ORDER_CARD,
      payload: e.response,
    });
  }
};
