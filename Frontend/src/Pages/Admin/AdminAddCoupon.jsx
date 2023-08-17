import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React, { useRef } from "react";
import { ToastContainer } from "react-toastify";
import AddCouponHook from "../../hook/coupon/add-coupon-hook";
import AdminCouponCard from "../../Components/Admin/AdminCouponCard";

const AdminAddCoupon = () => {
  const dateRef = useRef();
  const [
    couponName,
    couponDate,
    couponDiscount,
    onChangeCouponName,
    onChangeCouponDate,
    onChangeCouponDiscount,
    handleSubmit,
    allCoupons,
  ] = AddCouponHook();
  if (allCoupons) {
    console.log(allCoupons);
  }
  return (
    <>
      <div className="container mx-auto">
        <div className="pl-5 mb-10 ">
          <h1 className="font-bold text-xl">Add New Coupon</h1>
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
                ref={dateRef}
                onFocus={() => (dateRef.current.type = "date")}
                onBlur={() => (dateRef.current.type = "text")}
                className="w-full"
                onChange={onChangeCouponDate}
              />
              <label htmlFor="ExpireDate">Expire Date </label>
            </span>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:block ">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3  mx-5 mt-10">
          {allCoupons ? (
            allCoupons.map((item, index) => {
              return <AdminCouponCard key={index} coupon={item} />;
            })
          ) : (
            <div className="flex justify-center">
              <p>There No Coupons Yet</p>
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AdminAddCoupon;
