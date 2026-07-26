import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrders, getOneOrder } from "../../redux/actions/orderAction";

const ViewOrderDetailsHook = (id) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [orderItem, setOrderItem] = useState([]);

  const get = async () => {
    setLoading(true);
    await dispatch(getOneOrder(id));
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);
  const oneOrder = useSelector((state) => state.orderReducer.oneOrder);

  useEffect(() => {
    if (loading === false) {
      if (oneOrder.data) {
        setOrderItem(oneOrder.data);
      } else {
        setOrderItem([]);
      }
    }
  }, [loading]);

  return [orderItem];
};

export default ViewOrderDetailsHook;
