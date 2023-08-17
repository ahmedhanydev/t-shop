import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ title, img, id }) => {
  return (
    <Link
      to={`/products/category/${id}`}
      className=" bg-gray-200 shadow-md   w-52 h-52 relative flex flex-col justify-center items-center rounded-lg"
      // style={{ backgroundImage: `${img}`, backgroundPosition: "100% 100%" }}
    >
      <div className="w-3/4">
        <img src={img} className="" alt="" />
      </div>
      <h3 className=" text-lg absolute bottom-2   text-black font-bold">
        {title}
      </h3>
    </Link>
  );
};

export default CategoryCard;
