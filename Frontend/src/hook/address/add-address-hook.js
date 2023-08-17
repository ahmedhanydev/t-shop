import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifiction";
import { addAddress } from "../../redux/actions/addressAction";
import { useNavigate } from "react-router-dom";

const AddAddressHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const res = useSelector((state) => state.addressReducer.addAddress);

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
      addAddress({
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
          notify("add address is successfully", "success");
          setTimeout(() => {
            navigate("/user/addresses");
          }, 1000);
        } else {
          notify("add address is fail", "error");
        }
      }
    }
  }, [loading]);

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

export default AddAddressHook;
