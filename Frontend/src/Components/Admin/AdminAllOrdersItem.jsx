import React from "react";
import { RadioGroup } from "@headlessui/react";
import productOne from "../../assets/images/Iphone.png";
import catImgOne from "../../assets/images/laptop.png";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { Link } from "react-router-dom";
let products = {
  id: 1,
  name: "Throwback Hip Bag",
  href: "#",
  color: "#fca91e",
  price: "$90.00",
  quantity: 1,
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
  imageAlt:
    "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
};
// More products...
const items = [
  { label: 1, value: 1 },
  { label: 2, value: 2 },
  { label: 3, value: 3 },
  { label: 4, value: 4 },
  { label: 5, value: 5 },
];
const AdminAllOrdersItem = ({ orderItem, numberOrder }) => {
  const [selectedItem, setSelectedItem] = useState(1);
  if (orderItem) {
    console.log(orderItem._id);
  }
  return (
    <Link
      to={`/admin/orders/${orderItem._id}`}
      className="border-b-2 border-t-2 py-5  mb-5"
    >
      <div className="flex gap-5  lg:justify-between">
        <p className="text-lg lg:text-lg pb-5">
          <span className="text-base lg:text-lg font-semibold">
            Order number :{" "}
          </span>
          #{numberOrder ? numberOrder : ""}
        </p>
        <p className="font-semibold text-base lg:text-xl lg:pt-0  pt-[3px] lg:mr-10">
          Total : {orderItem.totalOrderPrice || 0}
        </p>
      </div>
      <div className="flex justify-center my-5">
        <p className="text-base lg:text-lg font-semibold">
          Order By : {orderItem.user.name} , Email:{orderItem.user.email}
        </p>
      </div>
      <div className=" flex lg:flex-row flex-col justify-evenly mt-5">
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
    </Link>
  );
};

export default AdminAllOrdersItem;
