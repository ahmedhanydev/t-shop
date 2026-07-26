import React, { useEffect } from "react";
import { useState } from "react";
import notify from "./../useNotifiction";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "./../../redux/actions/authAction";
import { useNavigate } from "react-router-dom";

const SignupHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const validation = () => {
    if (name === "") {
      notify("enter user name ", "warn");
      return;
    }
    if (phone <= 10) {
      notify("enter valid phone", "warn");
      return;
    }
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
    if (confirmPassword === "") {
      notify("enter confirm password", "warn");
      return;
    }
    if (password !== confirmPassword) {
      notify("There is a difference between ", "warn");
      return;
    }
  };

  const res = useSelector((state) => state.authReducer.newUser);

  const onSubmit = async (e) => {
    e.preventDefault();
    validation();

    setLoading(true);

    await dispatch(
      createUser({
        name,
        email,
        password,
        passwordConfirm: confirmPassword,
        phone,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res);
        if (res.token) {
          localStorage.setItem("token", res.token);

          notify("sign up is successful", "success");

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          notify(res.data.errors[0].msg, "error");
        }
      }
    }
  }, [loading]);

  return {
    name,
    email,
    phone,
    password,
    confirmPassword,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    onChangePassword,
    onChangeConfirmPassword,
    onSubmit,
  };
};

export default SignupHook;
