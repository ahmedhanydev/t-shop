import React, { useEffect, useState } from "react";
import notify from "../useNotifiction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetPassword, verifyPassword } from "../../redux/actions/authAction";

const VerifyPasswordHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);

  const onChangeCode = (e) => {
    setCode(e.target.value);
  };
  const res = useSelector((state) => state.authReducer.verifyPassword);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (code === "") {
      notify("enter code ", "warn");
      return;
    }

    setLoading(true);
    await dispatch(
      verifyPassword({
        resetCode: code,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.status === "verify is success") {
          notify("verify password is successfully", "success");
          setTimeout(() => {
            navigate("/reset-password");
          }, 1000);
        } else {
          notify("There is a problem with the code or it has expired", "error");
        }
      }
    }
  }, [loading]);

  return [code, onChangeCode, onSubmit];
};

export default VerifyPasswordHook;
