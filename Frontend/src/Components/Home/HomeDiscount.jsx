import React from "react";
import discountImg from "../../assets/images/bg.png";
const HomeDiscount = () => {
  return (
    <div className="container mx-auto flex justify-between items-center px-10 w-100 rounded-xl h-36 bg-gray-500 my-2">
      <p className="font-bold text-2xl text-white ">
        Up to 20% off with a code (<span className="text-red-500">Code</span>)
      </p>
      <img src={discountImg} className="h-36 w-1/3 " alt="" />
    </div>
  );
};

export default HomeDiscount;
