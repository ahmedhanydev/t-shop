import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

import { ToastContainer } from "react-toastify";
import AddSubcategoryHook from "../../hook/subcategory/add-subcategory-hook";

const AdminAddSubCategory = () => {
  const [
    nameEg,
    nameAr,
    id,
    loading,
    onChangeNameAr,
    onChangeNameEg,
    dataTest,
    subcategories,
    handelSubmit,
    onChangeId,
  ] = AddSubcategoryHook();
  return (
    <>
      <div className="container mx-auto">
        <div className="pl-5 mb-10 ">
          <h1 className="font-bold text-xl">Add SubCategory</h1>
        </div>

        <div className="flex flex-col gap-6 items-center   ">
          <div className="w-1/2">
            <div className="p-float-label  ">
              <InputText
                id="subcategoryNameEnglish"
                value={nameEg}
                className="w-full"
                onChange={onChangeNameEg}
                // onChange={(e) => setNameEg(e.target.value)}
              />
              <label htmlFor="subcategoryNameEnglish">
                SubCategories Name (English)
              </label>
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-float-label  ">
              <InputText
                id="subcategoryNameArabic"
                value={nameAr}
                className="w-full"
                onChange={onChangeNameAr}
                // onChange={(e) => setNameAr(e.target.value)}
              />
              <label htmlFor="subcategoryNameArabic">
                SubCategories Name (Arabic)
              </label>
            </div>
          </div>
          <div className="w-1/2">
            {}
            <Dropdown
              value={id}
              onChange={onChangeId}
              options={dataTest}
              virtualScrollerOptions={{ itemSize: 38 }}
              placeholder="Choose Category"
              className="w-full  md:w-14rem"
            />
          </div>
          <div>
            <button
              onClick={handelSubmit}
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

export default AdminAddSubCategory;
