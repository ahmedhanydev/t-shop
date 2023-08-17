import React from "react";
import { RadioGroup } from "@headlessui/react";
import productOne from "../../assets/images/Iphone.png";
import catImgOne from "../../assets/images/laptop.png";
import { Dropdown } from "primereact/dropdown";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import ClearUserCartHook from "../../hook/cart/clear-user-cart-hook";
import UpdateUserCartHook from "../../hook/cart/update-user-cart-hook";

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
const CartItem = ({ item }) => {
  const [deleteCartHandel, open, setOpen, cancelButtonRef, handelDeleteItem] =
    ClearUserCartHook(item._id);

  const [onChangeQuantity, quantityValue, updateItemQty] =
    UpdateUserCartHook(item);

  console.log(item);

  return (
    <div className=" grid grid-cols-1 lg:gap-0  gap-4 lg:grid-cols-3 place-items-center border-b-2 py-8 my-10">
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Delete Item
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete product from cart ?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        setOpen(false);
                        handelDeleteItem();
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>{" "}
      <div className="grid grid-cols-2">
        <div className="">
          <img src={item.product.imageCover.url || productOne} alt="" />
        </div>
        <div className="flex  flex-col justify-between">
          <p className="text-sm lg:text-base">
            <span className="text-sm lg:text-base font-semibold">
              Category :
            </span>{" "}
            {item.product.category.name || ""}
          </p>
          <h2 className="text-sm lg:text-lg font-semibold">
            {item.product.title || ""}
          </h2>

          {item.color ? (
            <p
              className="w-8 h-8 rounded-full "
              style={{ backgroundColor: `${item.color}` }}
            ></p>
          ) : (
            ""
          )}
          <p className="text-base">
            <span className="text-base font-semibold">Brand :</span>{" "}
            {item.product.brand.name || ""}
          </p>
        </div>
      </div>
      <div className="flex flex-col  items-center justify-center gap-2  w-full">
        <div className="w-1/2  flex justify-center">
          <Dropdown
            value={quantityValue}
            onChange={(e) => onChangeQuantity(e.value)}
            options={items}
            // defaultValue={1}
            virtualScrollerOptions={{ itemSize: 38 }}
            className="w-1/2 lg:1/5  "
          />
        </div>
        <button
          type="button"
          onClick={updateItemQty}
          className="font-medium  text-indigo-600 hover:text-indigo-500 "
        >
          Update
        </button>
      </div>
      <div className="flex justify-between items-center lg:pl-40 lg:mr-12  w-full ">
        <p className="text-xl font-semibold">{item.price || ""}$</p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="font-medium text-red-600 hover:text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
