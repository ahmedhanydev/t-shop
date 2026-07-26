import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import EditAddressHook from "../../hook/address/edit-address-hook";
import { useParams } from "react-router-dom";
const UserEditAddress = () => {
  const { id } = useParams();
  const [
    alias,
    details,
    phone,
    onChangeAlias,
    onChangeDetails,
    onChangePhone,
    handleSubmit,
  ] = EditAddressHook(id);
  return (
    <div>
      <div className="pl-5 mb-5">
        <h1 className="font-bold text-lg lg:text-xl">Edit Address </h1>
      </div>
      <div className="flex flex-col gap-8 items-center   ">
        <div className="w-1/2">
          <span className="p-float-label  ">
            <InputText
              id="addressName"
              value={alias}
              className="w-full"
              placeholder="home"
              onChange={onChangeAlias}
            />
            <label htmlFor="addressName">Address Name</label>
          </span>
        </div>
        <div className="card hidden lg:flex justify-content-center">
          <InputTextarea
            value={details}
            onChange={onChangeDetails}
            // placeholder="Address Details"
            placeholder="egypt, cairo , nsr city"
            rows={5}
            cols={60}
          />
        </div>
        <div className="card flex lg:hidden justify-content-center">
          <InputTextarea
            value={details}
            onChange={onChangeDetails}
            // placeholder="Address Details"
            placeholder="egypt, cairo , nsr city"
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
          Save Address Changes
        </button>
      </div>
    </div>
  );
};

export default UserEditAddress;
