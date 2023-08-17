import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserCart,
  deleteCartItem,
  getUserCart,
} from "../../redux/actions/cartAction";
import notify from "../useNotifiction";

const ClearUserCartHook = (itemID) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const get = async () => {};
    get();
  }, []);
  const res = useSelector((state) => state.cartReducer.clearUserCart);
  const deleteCartHandel = async () => {
    setLoading(true);
    await dispatch(clearUserCart());
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === "cart is cleared") {
        console.log(res);
        notify("cart is cleared", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        notify("there problem in clear cart", "error");
      }
    }
  }, [loading]);

  const handelDeleteItem = async () => {
    await dispatch(deleteCartItem(itemID));
    setOpen(false);
    window.location.reload(false);
  };

  return [deleteCartHandel, open, setOpen, cancelButtonRef, handelDeleteItem];
};
export default ClearUserCartHook;
