import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React, { useRef } from "react";
import { ToastContainer } from "react-toastify";
import AddCouponHook from "../../hook/coupon/add-coupon-hook";
import AdminCouponCard from "../../Components/Admin/AdminCouponCard";
import EditCouponHook from "../../hook/coupon/edit-coupon-hook";
import { useParams } from "react-router-dom";

const AdminEditCoupon = () => {
  const { id } = useParams();

  const [
    couponName,
    couponDate,
    couponDiscount,
    onChangeCouponName,
    onChangeCouponDate,
    onChangeCouponDiscount,
    handleSubmit,
  ] = EditCouponHook(id);

  return (
    <>
      <div className="container mx-auto">
        <div className="pl-5 mb-10 ">
          <h1 className="font-bold text-xl">Edit Coupon</h1>
        </div>

        <div className="flex flex-col gap-5 items-center   ">
          <div className="w-1/2">
            <span className="p-float-label  ">
              <InputText
                id="CouponName"
                value={couponName}
                className="w-full"
                onChange={onChangeCouponName}
              />
              <label htmlFor="CouponName">Coupon Name </label>
            </span>
          </div>
          <div className="w-1/2 my-2">
            <span className="p-float-label  ">
              <InputText
                id="ExpireDate"
                value={couponDate}
                type="text"
                // onBlur={() => (dateRef.current.type = "text")}
                className="w-full"
                onChange={onChangeCouponDate}
              />
              <label htmlFor="ExpireDate">Expire Date </label>
            </span>
          </div>
          <div className="w-1/2 ">
            <span className="p-float-label  ">
              <InputNumber
                id="Discount"
                value={couponDiscount}
                onValueChange={(e) => onChangeCouponDiscount(e.value)}
                prefix="%"
                className="w-full"
              />

              <label htmlFor="Discount">Discount </label>
            </span>
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="bg-gray-900 rounded-xl text-white px-7 py-3"
            >
              Save
            </button>
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default AdminEditCoupon;
