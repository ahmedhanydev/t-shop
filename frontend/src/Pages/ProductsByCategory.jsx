import React from "react";
import ProductsContainer from "../Components/Products/ProductsContainer";
import { Pagination } from "swiper/modules";
import ViewSearchProductsHook from "../hook/product/view-search-products";
import ViewProductsByCategoryHook from "../hook/product/view-products-category-hook";
import { useParams } from "react-router-dom";

const ProductsByCategory = () => {
  const { id } = useParams();
  const [productsList, onPress, pageCount] = ViewProductsByCategoryHook(id);

  return (
    <div className="container mx-auto">
      <ProductsContainer products={productsList} girdValue={4} />

      {pageCount > 1 ? (
        <Pagination pageCount={pageCount} onPress={onPress} />
      ) : null}
    </div>
  );
};

export default ProductsByCategory;
