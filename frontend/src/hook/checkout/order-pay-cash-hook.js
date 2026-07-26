import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import ViewAllAddressHook from "../address/view-all-address-hook";
import { useDispatch, useSelector } from "react-redux";
import { getOneAddress } from "../../redux/actions/addressAction";
import GetAllUserCart from "../cart/get-all-user-cart-hook";
import notify from "../useNotifiction";
import { createOrderCash } from "../../redux/actions/checkoutAction";
import { useNavigate } from "react-router-dom";

const OrderPayCashHook = () => {
  const dispatch = useDispatch();
  const [
    cartNum,
    cartItems,
    totalPrice,
    couponNameValue,
    totalPriceAfterDiscount,
    cartID,
  ] = GetAllUserCart();
  const toast = useRef(null);
  const navigate = useNavigate();
  // console.log(cartID);

  // const [selectedBtn, setSelectedBtn] = useState(radioBtns[1]);

  const radioBtns = [
    {
      id: "cash",
      name: "Payment when receiving",
      value: "cash",
      inputId: "f1",
    },
    {
      id: "card",
      name: "Payment by credit card",
      value: "card",
      inputId: "f2",
    },
  ];

  const show = () => {
    toast.current.show({
      severity: "success",
      summary: "Form Submitted",
      detail: formik.values.item,
    });
  };

  const formik = useFormik({
    initialValues: {
      item: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.item) {
        errors.item = "Value is required.";
      }

      return errors;
    },
    onSubmit: (data) => {
      data.item && show();
      formik.resetForm();
    },
  });

  const isFormFieldInvalid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? (
      <small className="p-error">{formik.errors[name]}</small>
    ) : (
      <small className="p-error">&nbsp;</small>
    );
  };
  const [addresses] = ViewAllAddressHook();

  const [addressDetails, setAddressDetails] = useState([]);
  const [addressSelected, setAddressSelected] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingAddress, setLoadingAddress] = useState(true);

  //   console.log(addresses);
  const onSelectAddress = (e) => {
    // console.log(e.target.value);
    setAddressSelected(e.target.value);

    get(e.target.value);
  };

  const oneAddress = useSelector((state) => state.addressReducer.oneAddress);

  const get = async (id) => {
    setLoadingAddress(true);
    await dispatch(getOneAddress(id));
    setLoadingAddress(false);
  };

  useEffect(() => {
    if (loadingAddress === false) {
      if (oneAddress && oneAddress.status === "success") {
        setAddressDetails(oneAddress.data);
        // console.log(addressDetails);
      } else {
        setAddressDetails([]);
      }
    }
  }, [loadingAddress]);

  let addressesList = [];
  if (addresses) {
    // eslint-disable-next-line array-callback-return
    addresses.map((item) => {
      addressesList.push({ label: item.alias, value: item._id });
    });
  }

  const handelOrderCash = async () => {
    if (cartID === "0") {
      notify("please add products in your cart", "warn");
      return;
    }
    if (addressSelected === "") {
      notify("please choose address", "warn");
      return;
    }
    setLoading(true);
    await dispatch(
      createOrderCash(cartID, {
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
  const orderCash = useSelector((state) => state.checkoutReducer.orderCash);

  useEffect(() => {
    if (loading === false) {
      if (orderCash && orderCash.status === "success") {
        notify("create your order is successfully", "success");
        setTimeout(() => {
          navigate("/user/allorders");
        }, 1500);
      } else {
        notify("create your fail , please try again", "error");
      }
    }
  }, [loading]);

  return [
    toast,
    formik,
    radioBtns,
    getFormErrorMessage,
    onSelectAddress,
    handelOrderCash,
    addressesList,
    addressSelected,

    totalPrice,
    totalPriceAfterDiscount,
    addressDetails,
  ];
};

export default OrderPayCashHook;
