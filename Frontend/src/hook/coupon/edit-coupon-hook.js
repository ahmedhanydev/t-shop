import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifiction";
import { getOneCoupon, updateCoupon } from "../../redux/actions/couponAction";
import { useNavigate } from "react-router-dom";

const EditCouponHook = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [couponName, setCouponName] = useState("");
  const [couponDate, setCouponDate] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingCoupon, setLoadingCoupon] = useState(true);

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
      updateCoupon(id, {
        name: couponName,
        expire: couponDate,
        discount: couponDiscount,
      })
    );
    setLoading(false);
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const get = async () => {
      setLoadingCoupon(true);
      await dispatch(getOneCoupon(id));
      setLoadingCoupon(false);
    };
    get();
  }, []);

  const oneCoupon = useSelector((state) => state.couponReducer.oneCoupon);

  useEffect(() => {
    if (loadingCoupon === false) {
      if (oneCoupon) {
        setCouponName(oneCoupon.data.name);
        setCouponDiscount(oneCoupon.data.discount);
        setCouponDate(formatDate(oneCoupon.data.expire));
      }
    }
  }, [loadingCoupon]);

  const res = useSelector((state) => state.couponReducer.updateCoupon);

  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.data) {
          notify("coupon is updated", "success");
          setTimeout(() => {
            navigate("/admin/addcoupon");
          }, 1000);
        } else {
          notify(" update coupon is fail", "error");
        }
        console.log();
        //   if (res.status === 201) {
        //     notify("coupon is created", "success");
        //     window.location.reload(false);
        //   } else  {
        //     notify("this coupon is exist", "error");
        //   }
      }
    }
  }, [loading]);

  return [
    couponName,
    couponDate,
    couponDiscount,
    onChangeCouponName,
    onChangeCouponDate,
    onChangeCouponDiscount,
    handleSubmit,
  ];
};

export default EditCouponHook;
