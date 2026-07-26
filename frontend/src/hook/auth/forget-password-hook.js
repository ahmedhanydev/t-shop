import React, { useEffect, useState } from "react";
import notify from "../useNotifiction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../redux/actions/authAction";

const ForgetPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const res = useSelector((state) => state.authReducer.forgetPassword);
  const onSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("user-email", email);
    if (email === "") {
      notify("enter email address", "warn");
      return;
    }

    setLoading(true);
    await dispatch(
      forgetPassword({
        email,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.status === "Success") {
          notify(res.message, "success");
          setTimeout(() => {
            navigate("/verify-password");
          }, 1000);
        } else {
          notify(res.data.message, "error");
        }
      }
    }
  }, [loading]);

  return [email, onChangeEmail, onSubmit];
};

export default ForgetPasswordHook;
