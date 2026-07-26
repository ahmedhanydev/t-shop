import React from "react";
import catImgOne from "../../assets/images/laptop.png";
import catImgTwo from "../../assets/images/Iphone.png";
import { Link } from "react-router-dom";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/actions/productAction";
const AdminAllProductsCard = ({ item }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const handelDelete = async () => {
    await dispatch(deleteProduct(item._id));
    setOpen(false);
    window.location.reload();
  };
  return (
    <>
      <div
        className="h-[380px] w-[252px] lg:w-[282px] max-h-[380px]  relative  border-2 rounded-xl "
        style={{ backgroundColor: "#F1F1F1" }}
      >
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
                            Delete Product
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to delete the product?
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
                          handelDelete();
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
        <button
          onClick={() => setOpen(true)}
          className="absolute top-0 lg:top-1 left-3 font-medium text-red-600 hover:text-red-500"
        >
          Remove
        </button>
        <Link
          to={`/admin/editproduct/${item._id}`}
          className="absolute top-0 lg:top-1 right-3 font-medium text-indigo-600 hover:text-indigo-500"
        >
          Edit
        </Link>
        <Link to={`/products/${item._id}`} className="flex flex-col  ">
          <div className="w-auto  h-1/2  p-6 ">
            <img
              src={item.imageCover.url}
              className=" rounded-md w-[250px] h-[200px]"
              alt=""
            />
          </div>
          <div className="px-4  flex items-center flex-col ">
            <h2 className=" text-lg lg:text-xl font-bold text-center truncate w-64">
              {item.title}
            </h2>
            <div className="  ">
              <div className="flex items-center justify-center  gap-2 py-2 ">
                {item.priceAfterDiscount ? (
                  <p
                    className=" font-bold text-base  line-through  "
                    style={{ color: "#A0A0A0" }}
                  >
                    {item.priceAfterDiscount} ${" "}
                  </p>
                ) : (
                  ""
                )}
                <p className=" font-bold text-base">{item.price} $ </p>
              </div>
              <p
                className="font-bold flex justify-center items-center gap-1 text-lg"
                style={{ color: "#ffd700" }}
              >
                {item.ratingsAverage}{" "}
                <i className="pi pi-star-fill" style={{ color: "#ffd700" }}></i>
                <span className="text-sm" style={{ color: "#A0A0A0" }}>
                  ({item.ratingsQuantity} reviews)
                </span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default AdminAllProductsCard;
