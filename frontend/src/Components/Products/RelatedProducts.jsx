import React from "react";
import { useParams } from "react-router-dom";
import ViewProductDetailsHook from "../../hook/product/view-product-details.hook";
import ProductsContainer from "./ProductsContainer";

const RelatedProducts = () => {
  const { id } = useParams();
  const [item, imagesList, products] = ViewProductDetailsHook(id);
  return (
    <div>
      {products.length > 0 ? (
        <ProductsContainer products={products} title="Related Products" />
      ) : (
        ""
      )}
    </div>
  );
};

export default RelatedProducts;
