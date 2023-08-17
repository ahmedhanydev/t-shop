import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { addProductToCart } from "../../redux/actions/cartAction";
import notify from "./../useNotifiction";
const AddToCartHook = (id, item) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const onSelectColor = (val) => {
    console.log(val);
    setSelectedColor(val);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const res = useSelector((state) => state.cartReducer.addToCart);

  const addToCartHandel = async () => {
    if (item.colors.length >= 1) {
      if (selectedColor === "") {
        notify("please select a color first ", "warn");
        return;
      }
    } else {
      setSelectedColor("");
    }
    setLoading(true);
    await dispatch(
      addProductToCart({
        productId: id,
        color: selectedColor,
      })
    );
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === "success") {
        // notify("product added to cart successfully", "success");
        window.location.reload(false);
        // setTimeout(() => {

        // }, 1000);
      } else {
        notify("please login and try again", "warn");
      }
    }
  }, [loading]);

  return [selectedColor, onSelectColor, classNames, addToCartHandel];
};

export default AddToCartHook;
