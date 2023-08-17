import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserCart,
  deleteCartItem,
  getUserCart,
  updateCartItem,
} from "../../redux/actions/cartAction";
import notify from "../useNotifiction";

const UpdateUserCartHook = (item) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [quantityValue, setQuantityValue] = useState(0);

  useEffect(() => {
    if (item) {
      setQuantityValue(item.quantity);
    }
  }, []);

  const onChangeQuantity = async (val) => {
    setQuantityValue(val);

    // window.location.reload(false);
  };

  //   useEffect(() => {}, [quantityValue]);
  const updateItemQty = async () => {
    setLoading(true);
    await dispatch(
      updateCartItem(item._id, {
        quantity: quantityValue,
      })
    );
    setLoading(false);
  };
  const res = useSelector((state) => state.cartReducer.updateCartItem);

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === "success") {
        window.location.reload(false);

        console.log(quantityValue);
        console.log(res);
      }
    }
  }, [loading]);

  return [onChangeQuantity, quantityValue, updateItemQty];
};

export default UpdateUserCartHook;
