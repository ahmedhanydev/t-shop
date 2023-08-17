import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  updateOrderDeliver,
  updateOrderPay,
} from "../../redux/actions/orderAction";
import notify from "./../useNotifiction";

const UpdateOrderStatusHook = (id) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [loadingDeliver, setLoadingDeliver] = useState(true);
  const [pay, setPay] = useState("");
  const [deliver, setDeliver] = useState("");

  const onChangePay = (val) => {
    console.log(val);
    setPay(val);
  };
  const onChangeDeliver = (val) => {
    setDeliver(val);
  };
  const items = [
    { label: "Under way", value: "false" },
    { label: "Been completed", value: "true" },
    // { label: "Cancel", value: "Cancel" },
  ];
  const itemsPaid = [
    { label: "Done", value: "true" },
    { label: "Not Done", value: "false" },
    // { label: "Cancel", value: "Cancel" },
  ];
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const orderPay = useSelector((state) => state.orderReducer.orderPay);
  const orderDeliver = useSelector((state) => state.orderReducer.orderDeliver);

  const handelChangePay = async () => {
    if (pay === "true") {
      setLoading(true);
      await dispatch(updateOrderPay(id));
      setLoading(false);
    }
  };
  const handelChangeDeliver = async () => {
    if (deliver === "true") {
      setLoadingDeliver(true);
      await dispatch(updateOrderDeliver(id));
      setLoadingDeliver(false);
    }
  };

  useEffect(() => {
    if (loadingDeliver === false) {
      if (orderDeliver && orderDeliver.status === "success") {
        notify("order is delivered successfully", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        notify("there problem in deliver status", "error");
      }
    }
  }, [loadingDeliver]);

  useEffect(() => {
    if (loading === false) {
      if (orderPay && orderPay.status === "success") {
        notify("order is paid successfully", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        notify("there problem in paid status", "error");
      }
    }
  }, [loading]);

  return [
    pay,
    deliver,
    onChangePay,
    onChangeDeliver,
    handelChangePay,
    handelChangeDeliver,
    formatDate,
    items,
    itemsPaid,
  ];
};

export default UpdateOrderStatusHook;
