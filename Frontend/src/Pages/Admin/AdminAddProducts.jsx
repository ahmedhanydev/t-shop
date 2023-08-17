import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import Multiselect from "multiselect-react-dropdown";
import uploadImg from "../../assets/images/upload.png";
import addImg from "../../assets/images/add.png";
import MultiImageInput from "react-multiple-image-input";

import { CompactPicker } from "react-color";
import { ToastContainer } from "react-toastify";
import AddProductHook from "../../hook/product/add-product-hook";
const AdminAddProducts = () => {
  const [
    categoriesList,
    brandsEgList,
    onSelectCategory,
    options,
    onSelectBrand,
    handleChangeComplete,
    removeColor,
    onSelect,
    onRemove,
    handleSubmit,
    images,
    setImages,
    colors,
    show,
    setShow,
    onChangeNameEg,
    onChangeNameAr,
    onChangeDescEg,
    onChangeDescAr,
    onChangePriceAfter,
    onChangePrice,
    onChangeQuantity,
    prodNameEg,
    prodNameAr,
    prodDescEg,
    prodDescAr,
    priceAfterValue,
    price,
    quantity,
    catID,
    brandID,
  ] = AddProductHook();

  // console.log(
  //   prodNameEg,
  //   prodNameAr,
  //   prodDescEg,
  //   prodDescAr,
  //   priceAfterValue,
  //   price,
  //   quantity,
  //   catID,
  //   brandID,
  //   colors,
  //   images
  // );
  const crop = {
    unit: "px",
    aspect: 4 / 3,
    width: "300",
  };
  return (
    <>
      <div className="container mx-auto">
        <div className="pl-5 mb-10 ">
          <h1 className="font-bold text-xl">Add New Product</h1>
        </div>
        <div className="flex flex-col mb-6 justify-center items-center">
          <p className="font-semibold text-base pb-3 mr-7">Product Image</p>
          <div>
            {" "}
            <div className="relative">
              <MultiImageInput
                images={images}
                allowCrop={false}
                // cropConfig={{ crop, ruleOfThirds: true }}
                setImages={setImages}
                theme={"light"}
                max={5}
                // cropConfig={{ crop, ruleOfThirds: true }}
              />
              {/* <input
                type="file"
                className=" opacity-0 absolute  rotate-45 bg-red-400 w-full  top-1/3"
                onChange={onImageChange}
              /> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center   ">
          <div className="w-1/2">
            <span className="p-float-label  ">
              <InputText
                id="productName"
                value={prodNameEg}
                className="w-full"
                onChange={onChangeNameEg}
              />
              <label htmlFor="productName">Product Name (English)</label>
            </span>
          </div>
          <div className="w-1/2">
            <span className="p-float-label  ">
              <InputText
                id="productName"
                value={prodNameAr}
                className="w-full"
                onChange={onChangeNameAr}
              />
              <label htmlFor="productName">Product Name (Arabic)</label>
            </span>
          </div>
          <div className="card hidden lg:flex justify-content-center">
            <InputTextarea
              value={prodDescEg}
              onChange={onChangeDescEg}
              placeholder="Product Description (English)"
              rows={5}
              cols={60}
            />
          </div>
          <div className="card flex lg:hidden justify-content-center">
            <InputTextarea
              value={prodDescEg}
              onChange={onChangeDescEg}
              placeholder="Product Description (English)"
              rows={5}
              cols={20}
            />
          </div>
          <div className="card hidden lg:flex justify-content-center">
            <InputTextarea
              value={prodDescAr}
              onChange={onChangeDescAr}
              placeholder="Product Description (Arabic)"
              rows={5}
              cols={60}
            />
          </div>
          <div className="card flex lg:hidden justify-content-center">
            <InputTextarea
              value={prodDescAr}
              onChange={onChangeDescAr}
              placeholder="Product Description (Arabic)"
              rows={5}
              cols={20}
            />
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:block ">
            <span className="p-float-label">
              <InputNumber
                id="number-input"
                value={priceAfterValue}
                className="w-1/2 lg:w-full"
                onValueChange={onChangePriceAfter}
              />
              <label htmlFor="number-input">Price After Discount</label>
            </span>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:block">
            <span className="p-float-label">
              <InputNumber
                id="number-input"
                value={price}
                className="w-full"
                onValueChange={onChangePrice}
              />
              <label htmlFor="number-input">Product Price </label>
            </span>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:block">
            <span className="p-float-label">
              <InputNumber
                id="number-input"
                value={quantity}
                className="w-full"
                onValueChange={onChangeQuantity}
              />
              <label htmlFor="number-input">Product Quantity </label>
            </span>
          </div>
          <div className="w-1/2">
            <Dropdown
              value={catID}
              onChange={onSelectCategory}
              options={categoriesList}
              virtualScrollerOptions={{ itemSize: 38 }}
              placeholder="Main Category "
              className="w-full  md:w-14rem"
            />
          </div>
          <div className="w-1/2">
            <Multiselect
              className=""
              placeholder="SubCategory"
              options={options}
              onSelect={onSelect}
              onRemove={onRemove}
              displayValue="name"
              style={{ color: "red" }}
            />
          </div>
          <div className="w-1/2">
            <Dropdown
              value={brandID}
              onChange={onSelectBrand}
              options={brandsEgList}
              virtualScrollerOptions={{ itemSize: 38 }}
              placeholder="Brand "
              className="w-full  md:w-14rem"
            />
          </div>
          <div className="flex flex-col items-center my-2">
            <p className="text-base font-semibold mb-1 ">Available Colors</p>
            <div className=" flex gap-1 ">
              {colors.length >= 1
                ? colors.map((color, index) => {
                    return (
                      <p
                        key={index}
                        onClick={() => removeColor(color)}
                        className="w-10 h-10 mt-1 cursor-pointer rounded-full "
                        style={{ backgroundColor: `${color}` }}
                      ></p>
                    );
                  })
                : null}

              <div className="flex ">
                <img
                  src={addImg}
                  onClick={() => setShow(!show)}
                  className="w-10 h-11 cursor-pointer  rounded-full "
                  alt=""
                />
              </div>
              {show === true ? (
                <CompactPicker onChangeComplete={handleChangeComplete} />
              ) : null}
            </div>
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
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminAddProducts;
