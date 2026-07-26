import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifiction";
import { addCoupon, getAllCoupon } from "../../redux/actions/couponAction";
import couponReducer from "./../../redux/reducers/couponReducer";

const AddCouponHook = () => {
  const dispatch = useDispatch();

  const [couponName, setCouponName] = useState("");
  const [couponDate, setCouponDate] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [loading, setLoading] = useState(true);

  const onChangeCouponName = (event) => {
    setCouponName(event.target.value);
  };
  const onChangeCouponDate = (event) => {
    setCouponDate(event.target.value);
  };
  const onChangeCouponDiscount = (val) => {
    console.log(val);
    setCouponDiscount(val);
  };

  const res = useSelector((state) => state.couponReducer.addCoupon);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (couponName === "") {
      notify("please enter coupon name", "warn");

      return;
    }

    if (couponDate === "") {
      notify("please enter coupon date", "warn");

      return;
    }

    if (couponDiscount === 0) {
      notify("please enter coupon discount value", "warn");

      return;
    }

    await dispatch(
      addCoupon({
        name: couponName,
        expire: couponDate,
        discount: couponDiscount,
      })
    );
    setLoading(false);
  };
  const allCoupon = useSelector((state) => state.couponReducer.allCoupon);

  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.status === 201) {
          notify("coupon is created", "success");
          window.location.reload(false);
        } else if (res.data.error.code === 11000) {
          notify("this coupon is exist", "error");
        }
      }
    }
  }, [loading]);

  useEffect(() => {
    const get = async () => {
      await dispatch(getAllCoupon());
    };
    get();
  }, []);

  let allCoupons = [];
  try {
    if (allCoupon) {
      allCoupons = allCoupon.data;
    }
  } catch (error) {}

  return [
    couponName,
    couponDate,
    couponDiscount,
    onChangeCouponName,
    onChangeCouponDate,
    onChangeCouponDiscount,
    handleSubmit,
    allCoupons,
  ];
};

export default AddCouponHook;
