import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Link, useNavigate } from "react-router-dom";
import ApplyCouponHook from "../../hook/cart/apply-coupon-hook";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import notify from "../../hook/useNotifiction";
import ViewAllAddressHook from "../../hook/address/view-all-address-hook";

const CartCheckout = ({
  cartItems,
  totalPrice,
  couponNameValue,
  totalPriceAfterDiscount,
}) => {
  const navigate = useNavigate();

  const [coupon, onChangeCoupon, applyHandel] = ApplyCouponHook();

  const getCheckout = () => {
    if (cartItems.length >= 1) {
      navigate("/orders/paymentmethod");
    } else {
      notify("please add product to cart", "warn");
    }
  };

  useEffect(() => {
    if (couponNameValue) {
      onChangeCoupon(couponNameValue);
    }
  }, [couponNameValue]);

  return (
    <div className="my-10">
      <div
        className=" w-full lg:w-1/2 mx-auto px-10 pt-10"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="flex justify-between gap-2 lg:gap-0 border-b-2 py-4">
          <p>Shipping</p>
          <span className="font-semibold">$0.00</span>
        </div>
        <div className="flex justify-between gap-2 lg:gap-0 border-b-2 py-4">
          <p>Tax</p>
          <span className="font-semibold">$0.00</span>
        </div>
        <div className="p-inputgroup my-5">
          <Button label="Apply" onClick={applyHandel} />
          <InputText
            value={coupon}
            placeholder="Discount Code"
            onChange={(e) => onChangeCoupon(e.target.value)}
          />
        </div>
        <div className="flex text-base gap-2 lg:gap-0 lg:text-xl font-semibold justify-between  border-t-2 py-4">
          <p>Order total</p>
          <span className="font-semibold">
            {totalPriceAfterDiscount >= 1 ? (
              <div className="flex gap-5">
                <span className="line-through text-gray-400">
                  {totalPrice}$
                </span>
                <span>{totalPriceAfterDiscount}$</span>
              </div>
            ) : (
              `${totalPrice}$`
            )}
          </span>
        </div>
      </div>
      <div
        className="mx-auto flex flex-col items-center gap-2 justify-center my-5
      "
      >
        <button
          label="Submit"
          onClick={() => getCheckout()}
          className="hover:opacity-90 w-3/4 lg:w-1/2  py-3 lg:py-4 rounded-xl font-semibold text-lg   text-white"
          style={{ backgroundColor: "#6366F1" }}
          type="submit"
        >
          Checkout
        </button>
        <div>
          <span>or </span>
          <Link
            to="/categories"
            className="font-lg text-indigo-600 font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CartCheckout;
