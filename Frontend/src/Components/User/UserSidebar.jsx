import React from "react";
import { Link } from "react-router-dom";

const UserSidebar = () => {
  return (
    <>
      <div
        className="rounded-xl  pb-80  mb-20"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="py-4 border-b-2 flex justify-center  ">
          <Link
            to="/user/allorders"
            className=" text-sm lg:text-base  text-center font-semibold "
          >
            Order management
          </Link>
        </div>

        <div className="py-4 border-b-2 flex justify-center">
          <Link
            to="/user/addresses"
            className="text-sm lg:text-base  text-center font-semibold"
          >
            Personal Addresses
          </Link>
        </div>
        <div className="py-4 border-b-2 flex justify-center">
          <Link
            to="/user/profile"
            className="text-sm lg:text-base  text-center font-semibold"
          >
            Profile Settings
          </Link>
        </div>
        <div className="py-4 border-b-2 flex justify-center">
          <Link
            to="/user/wishlist"
            className="text-sm lg:text-base  text-center font-semibold"
          >
            Wishlist
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
