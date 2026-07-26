import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputMask } from "primereact/inputmask";
import AddAddressHook from "../../hook/address/add-address-hook";
import { ToastContainer } from "react-toastify";
const UserAddAddress = () => {
  const [
    alias,
    details,
    phone,
    onChangeAlias,
    onChangeDetails,
    onChangePhone,
    handleSubmit,
  ] = AddAddressHook();

  return (
    <div>
      <div className="pl-5 mb-5">
        <h1 className="font-bold text-lg lg:text-xl">Add New Address </h1>
      </div>
      <div className="flex flex-col gap-8 items-center   ">
        <div className="w-1/2">
          <span className="p-float-label  ">
            <InputText
              id="addressName"
              value={alias}
              className="w-full"
              onChange={onChangeAlias}
            />
            <label htmlFor="addressName">Alias</label>
          </span>
        </div>
        <div className="hidden  card lg:flex justify-content-center">
          <InputTextarea
            value={details}
            onChange={onChangeDetails}
            placeholder="Address Details"
            rows={5}
            cols={60}
          />
        </div>
        <div className="card flex lg:hidden justify-content-center">
          <InputTextarea
            value={details}
            onChange={onChangeDetails}
            placeholder="Address Details"
            rows={5}
            cols={25}
          />
        </div>
        <div className="w-1/2">
          {/* <label htmlFor="phone" className=" block mb-2">
            Phone
          </label> */}
          <input
            value={phone}
            id="phone"
            mask="999-99999999"
            onChange={onChangePhone}
            className="w-full py-3 px-2 border-2 rounded-md  focus:outline-violet-300"
            placeholder="Phone Number"
          ></input>
        </div>
      </div>
      <div className="flex justify-center mt-16">
        <button
          onClick={handleSubmit}
          className="bg-gray-900 hover:bg-gray-800 px-10 py-3 rounded-lg text-white font-semibold "
        >
          Add Address
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserAddAddress;
