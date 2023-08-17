import React, { useLayoutEffect } from "react";
import ProductGallery from "./ProductGallery";
import ProductContent from "./ProductContent";
import ProductsContainer from "./ProductsContainer";
import ViewProductDetailsHook from "../../hook/product/view-product-details.hook";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-2 py-5">
        <div>
          <ProductGallery />
        </div>
        <div className="">
          <ProductContent />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
