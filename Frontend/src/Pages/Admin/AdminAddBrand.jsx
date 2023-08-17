import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import uploadImg from "../../assets/images/upload.png";
import AddBrandHook from "../../hook/brand/add-brand-hook";
import { ToastContainer } from "react-toastify";
const AdminAddBrand = () => {
  const [
    img,
    nameEg,
    nameAr,
    loading,
    isPress,
    onImageChange,
    handleSubmit,
    onChangeNameEg,
    onChangeNameAr,
  ] = AddBrandHook();
  return (
    <>
      <div className="container mx-auto">
        <div className="pl-5 mb-10 ">
          <h1 className="font-bold text-xl">Add Brand</h1>
        </div>
        <div className="flex flex-col mb-6 justify-center items-center">
          <p className="font-semibold text-base pb-3 mr-7">Brand Image</p>
          <div>
            {" "}
            <div className="relative">
              <img src={img} className="w-32" alt="" />
              <input
                type="file"
                className=" opacity-0 absolute  rotate-45 bg-red-400 w-full  top-1/3"
                onChange={onImageChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center   ">
          <div className="w-1/2">
            <span className="p-float-label  ">
              <InputText
                id="brandNameEnglish"
                value={nameEg}
                className="w-full"
                onChange={onChangeNameEg}
              />
              <label htmlFor="brandNameEnglish">Brand Name (English)</label>
            </span>
          </div>
          <div className="w-1/2">
            <span className="p-float-label  ">
              <InputText
                id="brandNameArabic"
                value={nameAr}
                className="w-full"
                onChange={onChangeNameAr}
              />
              <label htmlFor="brandNameArabic">Brand Name (Arabic)</label>
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
          {isPress ? (
            loading ? (
              <i
                className="pi pi-spin pi-spinner"
                style={{ fontSize: "2.5rem" }}
              ></i>
            ) : (
              <h3>created </h3>
            )
          ) : null}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AdminAddBrand;
