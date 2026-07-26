import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import ViewAllAddressHook from "../address/view-all-address-hook";
import { useDispatch, useSelector } from "react-redux";
import { getOneAddress } from "../../redux/actions/addressAction";
import GetAllUserCart from "../cart/get-all-user-cart-hook";
import notify from "../useNotifiction";
import {
  createOrderCard,
  createOrderCash,
} from "../../redux/actions/checkoutAction";
import { useNavigate } from "react-router-dom";

const OrderPayCardHook = (addressDetails) => {
  const dispatch = useDispatch();
  const [
    cartNum,
    cartItems,
    totalPrice,
    couponNameValue,
    totalPriceAfterDiscount,
    cartID,
  ] = GetAllUserCart();

  const navigate = useNavigate();
  // console.log(cartID);

  const [loading, setLoading] = useState(true);

  const handelOrderCard = async () => {
    if (cartID === "0") {
      notify("please add products in your cart", "warn");
      return;
    }

    setLoading(true);
    await dispatch(
      createOrderCard(cartID, {
        shippingAddress: {
          details: addressDetails.alias,
          phone: addressDetails.phone,
          city: addressDetails.details,
          postalCode: "",
        },
      })
    );
    setLoading(false);
  };
  const orderCard = useSelector((state) => state.checkoutReducer.orderCard);

  useEffect(() => {
    if (loading === false) {
      console.log(orderCard);
      if (orderCard && orderCard.status === "success") {
        window.open(orderCard.session.url);
      } else {
        notify("create your fail , please try again", "error");
      }
    }
  }, [loading]);

  return [handelOrderCard];
};

export default OrderPayCardHook;
