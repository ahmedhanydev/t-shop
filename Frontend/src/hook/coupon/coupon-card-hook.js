import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCoupon } from "../../redux/actions/couponAction";

const CouponCardHook = (coupon) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  let dateString = coupon.expire;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handelDelete = async () => {
    await dispatch(deleteCoupon(coupon._id));
    setOpen(false);
    window.location.reload(false);
  };

  return [open, setOpen, cancelButtonRef, dateString, formatDate, handelDelete];
};

export default CouponCardHook;
