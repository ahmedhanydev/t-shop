import React, { useEffect, useLayoutEffect } from "react";
import ProductDetails from "../Components/Products/ProductDetails";
import RateContainer from "../Components/Rate/RateContainer";

import RelatedProducts from "../Components/Products/RelatedProducts";

const ProductPage = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="container mx-auto">
      <ProductDetails />

      <RateContainer />
      <RelatedProducts />
    </div>
  );
};

export default ProductPage;
