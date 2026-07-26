import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../../redux/actions/cartAction";

const GetAllUserCart = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [cartNum, setCartNum] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponNameValue, setCouponNameValue] = useState("");
  const [cartID, setCartID] = useState("0");
  const [totalPriceAfterDiscount, setTotalPriceAfterDiscount] = useState(0);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getUserCart());
      setLoading(false);
    };
    get();
  }, []);
  const res = useSelector((state) => state.cartReducer.userCart);

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === "success") {
        setCartNum(res.numOfCartItems);
        setCartItems(res.data.cartItems);
        setTotalPrice(res.data.totalCartPrice);
        if (res.data.totalPriceAfterDiscount) {
          setTotalPriceAfterDiscount(res.data.totalPriceAfterDiscount);
        }
        if (res.data.coupon) {
          setCouponNameValue(res.data.coupon);
        }

        setCartID(res.data._id);
      } else {
        setCartNum(0);
        setCartID("0");
        setCartItems([]);
        setTotalPrice(0);
        setTotalPriceAfterDiscount(0);
        setCouponNameValue("");
      }
    }
  }, [loading]);

  return [
    cartNum,
    cartItems,
    totalPrice,
    couponNameValue,
    totalPriceAfterDiscount,
    cartID,
  ];
};

export default GetAllUserCart;
