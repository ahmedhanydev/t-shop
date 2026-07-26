import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import UserSidebar from "../../Components/User/UserSidebar";

const UserPage = () => {
  return (
    <div
      className="container mx-auto mt-10 "
      style={{ minHeight: "670px", marginBottom: "250px" }}
    >
      <div className="w-full   grid grid-cols-4 ">
        <div className="grid col-span-1">
          <UserSidebar />
        </div>
        <div className="grid col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
