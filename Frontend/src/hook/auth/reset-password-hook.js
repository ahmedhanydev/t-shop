import React, { useEffect, useState } from "react";
import notify from "../useNotifiction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  forgetPassword,
  resetPassword,
  verifyPassword,
} from "../../redux/actions/authAction";

const ResetPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const res = useSelector((state) => state.authReducer.resetPassword);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      notify("enter password ", "warn");
      return;
    }
    if (confirmPassword === "") {
      notify("enter password ", "warn");
      return;
    }
    if (password !== confirmPassword) {
      notify("There is a difference between ", "warn");
      return;
    }

    setLoading(true);
    await dispatch(
      resetPassword({
        email: localStorage.getItem("user-email"),
        newPassword: password,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res.status);
        if (res.status === "success") {
          notify(" password changed", "success");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          notify("there problem in password or code", "error");
        }
      }
    }
  }, [loading]);

  return [
    password,
    confirmPassword,
    onChangePassword,
    onChangeConfirmPassword,
    onSubmit,
  ];
};

export default ResetPasswordHook;
