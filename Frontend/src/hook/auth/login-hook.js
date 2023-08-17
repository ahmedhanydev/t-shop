import React, { useEffect } from "react";
import { useState } from "react";
import notify from "./../useNotifiction";
import { useDispatch, useSelector } from "react-redux";
import { createUser, loginUser } from "./../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const LoginHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validation = () => {
    if (email != "") {
      if (validateEmail(email) === false) {
        notify("enter valid email", "warn");
        return;
      }
    }
    if (password === "") {
      notify("enter password", "warn");
      return;
    }
  };
  const res = useSelector((state) => state.authReducer.loggedUser);
  const onSubmit = async (e) => {
    e.preventDefault();
    validation();

    setLoading(true);
    setIsPress(true);
    await dispatch(
      loginUser({
        email,
        password,
      })
    );
    setLoading(false);
    setIsPress(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.token) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.data));
          notify("login is successful", "success");
          setTimeout(() => {
            window.location.href = "/";
            // navigate("/");
          }, 1000);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
        if (res.data) {
          if (res.data.message) {
            notify(res.data.message, "error");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }
        }
      }
    }
  }, [loading]);

  return [
    email,
    password,
    onChangeEmail,
    onChangePassword,
    loading,
    onSubmit,
    isPress,
  ];
};

export default LoginHook;
