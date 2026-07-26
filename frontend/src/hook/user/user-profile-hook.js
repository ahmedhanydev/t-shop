import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress } from "../../redux/actions/addressAction";
import {
  updateMyData,
  updateUserPassword,
} from "../../redux/actions/userAction";
import notify from "../useNotifiction";
import { useNavigate } from "react-router-dom";

const UserProfileHook = (address) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);
  let user = [];
  if (localStorage.getItem("user") != null) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [loading, setLoading] = useState(true);

  const onChangeName = (event) => {
    setName(event.target.value);
  };
  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const onChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const res = useSelector((state) => state.userReducer.updateUser);
  const handleSubmit = async () => {
    let body;

    if (user.email === email) {
      body = {
        name,
        phone,
      };
    } else {
      body = {
        name,
        email,
        phone,
      };
    }

    setLoading(true);
    await dispatch(updateMyData(body));
    setLoading(false);

    setOpen(false);
    //
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.status === "success") {
          localStorage.setItem("user", JSON.stringify(res.data));
          setTimeout(() => {
            window.location.reload(false);
          }, 1500);
        }
      }
    }
  }, [loading]);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loadingPass, setLoadingPass] = useState(true);
  const onChangeOldPassword = (event) => {
    setOldPassword(event.target.value);
  };
  const onChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };
  const onChangeConfirmNewPassword = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const changePassword = async () => {
    setLoadingPass(true);
    await dispatch(
      updateUserPassword({
        currentPassword: oldPassword,
        password: newPassword,
        passwordConfirm: confirmNewPassword,
      })
    );
    setLoadingPass(false);
  };
  const resPass = useSelector((state) => state.userReducer.updateUserPassword);

  useEffect(() => {
    if (loadingPass === false) {
      if (resPass) {
        console.log(resPass.token);
        if (resPass.token) {
          notify("password updated successfully", "success");

          setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login");
          }, 1500);
        } else {
          notify("there is problem in password try agin", "error");
        }
      }
    }
  }, [loadingPass]);

  return [
    user,
    open,
    setOpen,
    cancelButtonRef,
    handleSubmit,
    name,
    email,
    phone,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    oldPassword,
    newPassword,
    confirmNewPassword,
    onChangeOldPassword,
    onChangeNewPassword,
    onChangeConfirmNewPassword,
    changePassword,
  ];
};

export default UserProfileHook;
