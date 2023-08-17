import React from "react";
import ProductsContainer from "../Components/Products/ProductsContainer";
import { Pagination } from "swiper/modules";

import { useParams } from "react-router-dom";
import ViewProductsByBrandHook from "../hook/product/view-products-brand-hook";

const ProductsByBrand = () => {
  const { id } = useParams();
  const [productsList, onPress, pageCount] = ViewProductsByBrandHook(id);

  return (
    <div className="container mx-auto">
      <ProductsContainer products={productsList} girdValue={4} />

      {pageCount > 1 ? (
        <Pagination pageCount={pageCount} onPress={onPress} />
      ) : null}
    </div>
  );
};

export default ProductsByBrand;
