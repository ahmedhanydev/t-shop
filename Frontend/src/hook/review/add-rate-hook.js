import React, { useEffect, useState } from "react";
import notify from "../useNotifiction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../redux/actions/authAction";
import { createReview } from "../../redux/actions/reviewAction";
import reviewReducer from "./../../redux/reducers/reviewReducer";

const AddRateHook = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rateText, setRateText] = useState("");
  const [rateValue, setRateValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const onChangeRateText = (val) => {
    // console.log(e);
    setRateText(val);
  };

  const onChangeRateValue = (val) => {
    setRateValue(val);
  };
  let user = "";
  if (localStorage.getItem("user") != null) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (rateText === "") {
      notify("enter rate description  ", "warn");
      return;
    }
    if (rateValue < 1) {
      notify("rate starts must be between 1 and 5 ", "error");
      return;
    }

    setLoading(true);

    await dispatch(
      createReview(id, {
        title: rateText,
        ratings: rateValue,
      })
    );
    setLoading(false);
  };
  const res = useSelector((state) => state.reviewReducer.createReview);

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res);
        if (res.data.message === "you not allowed to this route") {
          notify("admin can't write review", "error");
        } else if (res.status === 201) {
          notify("review added", "success");
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
          setRateText("");
          setRateValue(0);
        } else if (res.data.errors) {
          notify(res.data.errors[0].msg, "error");
        }
      }
    }
  }, [loading]);

  return [
    rateText,
    rateValue,
    onChangeRateText,
    onChangeRateValue,
    onSubmit,
    user,
  ];
};

export default AddRateHook;
