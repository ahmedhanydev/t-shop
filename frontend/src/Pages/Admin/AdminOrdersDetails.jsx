import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import AdminAllOrdersItem from "../../Components/Admin/AdminAllOrdersItem";
import { useParams } from "react-router-dom";
import UserAllOrdersItem from "../../Components/User/UserAllOrdersItem";
import ViewOrderDetailsHook from "../../hook/admin/view-order-details-hook";
import UserProductsCard from "../User/UserProductsCard";
import UpdateOrderStatusHook from "../../hook/admin/update-order-status-hook";
import { ToastContainer } from "react-toastify";

const AdminOrdersDetails = () => {
  const { id } = useParams();
  const [orderItem] = ViewOrderDetailsHook(id);
  const [
    pay,
    deliver,
    onChangePay,
    onChangeDeliver,
    handelChangePay,
    handelChangeDeliver,
    formatDate,
    items,
    itemsPaid,
  ] = UpdateOrderStatusHook(id);
  return (
    <div className="container mx-auto ">
      <div className="pl-5 mb-5">
        <h1 className="font-bold text-xl">
          {" "}
          Create on : {formatDate(orderItem.createdAt)}
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-3  mx-5">
        {/* <AdminAllOrdersItem />
        <AdminAllOrdersItem /> */}
        <div>
          <div className="border-b-2 border-t-2 py-5  mb-5">
            <div className="flex justify-between">
              {/* <p className="text-lg lg:text-lg pb-5">
                <span className="text-lg lg:text-lg font-semibold">
                  Order number :{" "}
                </span>
                #
              </p> */}
              {/* <p className="font-semibold text-xl mr-10">
                Total : {orderItem.totalOrderPrice || 0}
              </p> */}
            </div>
            {orderItem
              ? orderItem.cartItems
                ? orderItem.cartItems.length >= 1
                  ? orderItem.cartItems.map((item, index) => {
                      return <UserProductsCard key={index} item={item} />;
                    })
                  : null
                : null
              : null}

            <div className=" flex lg:flex-row flex-col justify-evenly my-2">
              <div className="flex justify-start">
                <p className="font-semibold text-base lg:text-lg mr-10">
                  Order status :{" "}
                  {orderItem.isDelivered === false ? (
                    <span className="text-gray-500">Underway</span>
                  ) : (
                    <span className="text-gray-500">Delivered</span>
                  )}
                </p>
              </div>
              <div className="flex justify-start">
                <p className="font-semibold text-base lg:text-lg mr-10">
                  Payment Status :{" "}
                  {orderItem.isPaid === false ? (
                    <span className="text-gray-500">Not Done</span>
                  ) : (
                    <span className="text-gray-500">Done</span>
                  )}
                </p>
              </div>
              <div className="flex justify-start">
                <p className="font-semibold text-base lg:text-lg mr-10">
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
      </div>

      <div
        className=" ml-2 lg:mx-10 py-20 pl-3 lg:px-10 "
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <div>
          <h2 className="font-semibold text-lg pb-3">Customer Details:</h2>
          <p className=" text-base">
            <span className="font-medium">Name: </span>{" "}
            {orderItem.user ? orderItem.user.name : ""}
          </p>
          <p className=" text-base py-2">
            <span className="font-medium">Phone Number: </span>
            {orderItem.user ? orderItem.user.phone : ""}
          </p>
          <p className=" text-base">
            <span className="font-medium">Email: </span>
            {orderItem.user ? orderItem.user.email : ""}
          </p>
        </div>

        <div className="flex justify-center py-5 mt-5 border-y-2 ">
          <p className="text-lg font-medium ">
            Total Order : {orderItem.totalOrderPrice || 0}
          </p>
        </div>
        <div className="flex lg:justify-evenly   flex-col lg:flex-row w-1/2 lg:w-full">
          <div className="flex lg:justify-center justify-start mt-10">
            <button
              onClick={handelChangeDeliver}
              className="bg-gray-900 px-5 py-3 mr-1 rounded-lg text-white"
            >
              Save
            </button>

            <Dropdown
              value={deliver}
              onChange={(e) => onChangeDeliver(e.value)}
              options={items}
              virtualScrollerOptions={{ itemSize: 38 }}
              placeholder="Order Status"
              className=" w-full md:w-full"
            />
          </div>
          <div className="flex lg:justify-center justify-start mt-10">
            <button
              onClick={handelChangePay}
              className="bg-gray-900 px-5 py-3 mr-1 rounded-lg text-white"
            >
              Save
            </button>

            <Dropdown
              value={pay}
              onChange={(e) => onChangePay(e.value)}
              options={itemsPaid}
              virtualScrollerOptions={{ itemSize: 38 }}
              placeholder="Payment Status"
              className=" w-full md:w-full"
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminOrdersDetails;
