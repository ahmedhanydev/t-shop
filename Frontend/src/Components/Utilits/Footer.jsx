import React from "react";

const Footer = () => {
  const currentYear = new Date(Date.now()).getFullYear();
  return (
    <div>
      <div
        className="flex sm:h-[350px] pb-3 "
        style={{ backgroundColor: "#3C4242" }}
      >
        <div className="container mx-auto grid grid-cols-1 gap-5 pl-5 lg:grid-cols-4 pt-12 ">
          <div className="flex flex-col  gap-5 ">
            <h3 className="text-white text-3xl font-bold pb-3">Need Help</h3>
            <h4 className="text-white text-xl">Track Order</h4>
            <h4 className="text-white text-xl">Returns & Refunds</h4>
            <h4 className="text-white text-xl">FAQ's</h4>
          </div>
          <div className="hidden lg:flex  flex-col gap-5 ">
            <h3 className="text-white text-3xl font-bold pb-3">Company</h3>
            <h4 className="text-white text-xl">About Us</h4>
            <h4 className="text-white text-xl">T-Shop Blog</h4>
            <h4 className="text-white text-xl">FAQ's</h4>
          </div>
          <div className="flex flex-col gap-5 ">
            <h3 className="text-white text-3xl font-bold pb-3">More Info</h3>
            <h4 className="text-white text-xl">Term and Conditions</h4>
            <h4 className="text-white text-xl">Privacy Policy</h4>
            <h4 className="text-white text-xl">Sitemap</h4>
          </div>
          <div className="flex flex-col gap-5 ">
            <h3 className="text-white text-3xl font-bold pb-3">Location</h3>
            <h4 className="text-white text-xl">support@t-shop.com</h4>
            <h4 className="text-white text-xl">Egypt , Cairo</h4>
            <h4 className="text-white text-xl">Sitemap</h4>
          </div>
        </div>
      </div>

      <div
        className="h-[60px] flex justify-center items-center"
        style={{ backgroundColor: "#282b2b" }}
      >
        <p className="text-white text-lg">
          &copy; {currentYear} T-Shop. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
