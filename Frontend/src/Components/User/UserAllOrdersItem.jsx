import React from "react";
import UserProductsCard from "../../Pages/User/UserProductsCard";

const UserAllOrdersItem = ({ orderItem, numberOrder }) => {
  // console.log(orderItem);
  return (
    <div>
      <div className="border-b-2 border-t-2 py-5  mb-5">
        <div className="flex justify-between">
          <p className="text-base lg:text-lg pb-5">
            <span className="text-base lg:text-lg font-semibold">
              Order number :{" "}
            </span>
            #{numberOrder ? numberOrder : ""}
          </p>
          <p className="font-semibold text-lg lg:text-xl mr-10">
            Total : {orderItem.totalOrderPrice || 0}
          </p>
        </div>
        {orderItem
          ? orderItem.cartItems.length >= 1
            ? orderItem.cartItems.map((item, index) => {
                return <UserProductsCard key={index} item={item} />;
              })
            : null
          : null}

        <div className=" flex flex-col lg:flex-row justify-evenly my-2">
          <div className="flex justify-start">
            <p className="font-semibold text-lg mr-10">
              Order status :{" "}
              {orderItem.isDelivered === false ? (
                <span className="text-gray-500">Underway</span>
              ) : (
                <span className="text-gray-500">Delivered</span>
              )}
            </p>
          </div>
          <div className="flex justify-start">
            <p className="font-semibold text-lg mr-10">
              Payment Status :{" "}
              {orderItem.isPaid === false ? (
                <span className="text-gray-500">Not Done</span>
              ) : (
                <span className="text-gray-500">Done</span>
              )}
            </p>
          </div>
          <div className="flex justify-start">
            <p className="font-semibold text-lg mr-10">
              Payment Method :{" "}
              {orderItem.paymentMethodType === "cash" ? (
                <span className="text-gray-500">Cash</span>
              ) : (
                <span className="text-gray-500">Credit Card</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAllOrdersItem;
