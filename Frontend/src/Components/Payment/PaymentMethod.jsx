import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { RadioButton } from "primereact/radiobutton";
import ViewAllAddressHook from "../../hook/address/view-all-address-hook";
import { Dropdown } from "primereact/dropdown";
import OrderPayCashHook from "../../hook/checkout/order-pay-cash-hook";
import { ToastContainer } from "react-toastify";
import notify from "../../hook/useNotifiction";
import OrderPayCardHook from "../../hook/checkout/order-pay-card-hook";

const PaymentMethod = () => {
  const [
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
  ] = OrderPayCashHook();

  const [handelOrderCard] = OrderPayCardHook(addressDetails);
  const [type, setType] = useState("");
  console.log(type);

  const handelPay = (e) => {
    e.preventDefault();
    console.log(type);
    if (type === "cash") {
      handelOrderCash();
    } else if (type === "card") {
      handelOrderCard();
    } else {
      notify("please choose payment method", "warn");
    }
  };
  return (
    <>
      <div
        className="card flex justify-center items-center w-full lg:w-1/2 border-4 py-20 my-20"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <form
          // onSubmit={formik.handleSubmit}
          className="flex flex-col justify-center items-center gap-2 w-full"
        >
          <div className="text-2xl font-bold pb-8">
            Choose the payment method.
          </div>

          <div className="flex flex-col  gap-5">
            {/* <Toast ref={toast} /> */}
            {radioBtns.map((btn, i) => {
              return (
                <div key={i} className="flex align-items-center">
                  <RadioButton
                    inputId={btn.inputId}
                    // name="category"
                    value={btn.value}
                    onChange={(e) => setType(e.value)}
                    checked={type === btn.value}
                  />
                  <label
                    htmlFor={btn.inputId}
                    className="ml-1  text-xl font-bold "
                  >
                    {btn.name}
                  </label>
                </div>
              );
            })}
            {/* {radioBtns.map((btn, i) => {
              return (
                <div key={i} className="flex items-center mr-3">
                  <RadioButton
                    {...btn}
                    checked={formik.values.item === btn.value}
                    onChange={(e) => {
                      // formik.setFieldValue("item", e.value);
                      setType(e.value);
                    }}
                  />
                  <label
                    htmlFor={btn.inputId}
                    className="ml-1  text-xl font-bold "
                  >
                    {btn.name}
                  </label>
                </div>
              );
            })} */}
          </div>
          <div className="flex w-1/3 my-3">
            <Dropdown
              value={addressSelected}
              onChange={onSelectAddress}
              options={addressesList}
              virtualScrollerOptions={{ itemSize: 38 }}
              placeholder="Choose a shipping address "
              className="w-full  md:w-14rem"
            />
            {/* <Link></Link> */}
          </div>
          {/* {getFormErrorMessage("item")} */}
          <div className="flex items-center justify-evenly w-full py-5">
            <Button
              // type="submit"
              onClick={handelPay}
              className="bg-indigo-600 w-1/2"
              label="Checkout"
            />
            <p className="border-2 px-2 py-3 font-semibold">
              <span className="font-bold"> Order Total : </span>{" "}
              {totalPriceAfterDiscount ? totalPriceAfterDiscount : totalPrice}
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default PaymentMethod;
