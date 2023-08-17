import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifiction";

import { useNavigate } from "react-router-dom";
import {
  getOneAddress,
  updateAddress,
} from "../../redux/actions/addressAction";

const EditAddressHook = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingAddress, setLoadingAddress] = useState(true);

  const onChangeAlias = (event) => {
    setAlias(event.target.value);
    console.log(event.target.value);
  };
  const onChangeDetails = (event) => {
    setDetails(event.target.value);
    console.log(event.target.value);
  };
  const onChangePhone = (event) => {
    console.log(event.target.value);
    setPhone(event.target.value);
  };

  const res = useSelector((state) => state.addressReducer.updateAddress);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (alias === "") {
      notify("please enter alias", "warn");

      return;
    }

    if (details === "") {
      notify("please enter address details", "warn");

      return;
    }

    if (phone === 0) {
      notify("please enter your phone", "warn");

      return;
    }

    setLoading(true);

    await dispatch(
      updateAddress(id, {
        alias,
        details,
        phone,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res);

        if (res.status === "success") {
          notify(res.message, "success");
          setTimeout(() => {
            navigate("/user/addresses");
          }, 1000);
        } else {
          notify("update address is fail", "error");
        }
      }
    }
  }, [loading]);

  useEffect(() => {
    const get = async () => {
      setLoadingAddress(true);
      await dispatch(getOneAddress(id));
      setLoadingAddress(false);
    };
    get();
  }, []);

  const oneAddress = useSelector((state) => state.addressReducer.oneAddress);

  useEffect(() => {
    if (loadingAddress === false) {
      if (oneAddress) {
        console.log(oneAddress);
        setAlias(oneAddress.data.alias);
        setDetails(oneAddress.data.details);
        setPhone(oneAddress.data.phone);
      }
    }
  }, [loadingAddress]);

  //   const res = useSelector((state) => state.couponReducer.updateCoupon);

  //   useEffect(() => {
  //     if (loading === false) {
  //       if (res) {
  //         if (res.data) {
  //           notify("coupon is updated", "success");
  //           setTimeout(() => {
  //             navigate("/admin/addcoupon");
  //           }, 1000);
  //         } else {
  //           notify(" update coupon is fail", "error");
  //         }
  //
  //       }
  //     }
  //   }, [loading]);
  return [
    alias,
    details,
    phone,
    onChangeAlias,
    onChangeDetails,
    onChangePhone,
    handleSubmit,
  ];
};
export default EditAddressHook;
