import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import ViewProductDetailsHook from "../../hook/product/view-product-details.hook";
import { useParams } from "react-router-dom";
import AddToCartHook from "../../hook/cart/add-to- cart-hook";
import { ToastContainer } from "react-toastify";
import ProductCardHook from "../../hook/product/product-card-hook";
import ProductsContainerHook from "../../hook/product/products-container-hook";

// const product = {
//   name: "Basic Tee 6-Pack",
//   price: "$192",
//   href: "#",
//   category: "mobile",
//   brand: "iphone",
//   //   images: [
//   //     {
//   //       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
//   //       alt: "Two each of gray, white, and black shirts laying flat.",
//   //     },
//   //     {
//   //       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
//   //       alt: "Model wearing plain black basic tee.",
//   //     },
//   //     {
//   //       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
//   //       alt: "Model wearing plain gray basic tee.",
//   //     },
//   //     {
//   //       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
//   //       alt: "Model wearing plain white basic tee.",
//   //     },
//   //   ],
//   colors: [
//     { name: "red", class: "bg-red-500", selectedClass: "ring-gray-400" },
//     { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//     { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
//   ],

//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
// };
const selectedClass = "ring-gray-500";
const ProductContent = () => {
  const { id } = useParams();
  const [item, imagesList, products] = ViewProductDetailsHook(id);
  const [favList] = ProductsContainerHook();
  const [isFavIcon, handelFav] = ProductCardHook(favList, id);
  // console.log(productBrand.name);
  const [selectedColor, onSelectColor, classNames, addToCartHandel] =
    AddToCartHook(id, item);
  let colorsList = [];
  if (item.colors) {
    colorsList = item.colors;
  }
  return (
    <div>
      {/* Product info */}
      {item ? (
        <div className="mx-auto ">
          <div className="flex flex-col gap-4 p-8 ">
            <h2 className="text-base font-medium text-gray-900">
              <span className="text-base  font-medium text-gray-900">
                Category :
              </span>{" "}
              {item.category ? item.category.name : ""}
            </h2>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {item.title || ""}
            </h1>

            <h2 className="text-base ">
              <span className="text-base  font-medium text-gray-900">
                Brand :{" "}
              </span>

              {item.brand ? item.brand.name : ""}
            </h2>

            <form className="my-6">
              {/* Colors */}
              {colorsList.length > 0 ? (
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color :</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={onSelectColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {colorsList
                        ? colorsList.map((color, index) => (
                            <RadioGroup.Option
                              key={index}
                              value={color}
                              className={({ active, checked }) =>
                                classNames(
                                  selectedClass,
                                  active && checked ? "ring ring-offset-1" : "",
                                  !active && checked ? "ring-2" : "",
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                                )
                              }
                            >
                              <span
                                aria-hidden="true"
                                className="h-8 w-8 rounded-full border border-black border-opacity-10"
                                style={{ backgroundColor: `${color}` }}
                              />
                            </RadioGroup.Option>
                          ))
                        : ""}
                    </div>
                  </RadioGroup>
                </div>
              ) : (
                ""
              )}
            </form>
            <p>
              <span className="text-base font-medium text-gray-900 block pb-1">
                Description :
              </span>
              {item.description || ""}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addToCartHandel}
              className="w-1/2 flex  justify-center ml-10 py-3 rounded-lg items-center bg-gray-700 hover:bg-gray-600 text-white"
            >
              Add to Cart
            </button>
            <button
              onClick={handelFav}
              className="py-2 px-3 flex justify-center items-center rounded-md border-2 border-gray-600 hover:bg-gray-500 hover:text-white"
            >
              {isFavIcon === true ? (
                <i
                  className="pi pi-heart-fill"
                  style={{ color: "red", fontSize: "1.5rem" }}
                ></i>
              ) : (
                <i className="pi pi-heart " style={{ fontSize: "1.5rem" }}></i>
              )}
            </button>
          </div>
          {/* Options */}
          <ToastContainer />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductContent;
