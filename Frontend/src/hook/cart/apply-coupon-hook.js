import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import notify from "./../useNotifiction";
import { applyCouponCart } from "../../redux/actions/cartAction";

const ApplyCouponHook = () => {
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const onChangeCoupon = (val) => {
    setCoupon(val);
  };

  const res = useSelector((state) => state.cartReducer.applyCouponCart);

  const applyHandel = async () => {
    if (coupon === "") {
      notify("please enter a coupon", "warn");
      return;
    }
    setLoading(true);
    await dispatch(
      applyCouponCart({
        coupon: coupon,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      console.log(res);
      if (res && res.status === "success") {
        notify("apply coupon is done", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        notify(
          "the coupon name is incorrect or the coupon has expired ",
          "error"
        );
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      }
    }
  }, [loading]);

  return [coupon, onChangeCoupon, applyHandel];
};

export default ApplyCouponHook;
