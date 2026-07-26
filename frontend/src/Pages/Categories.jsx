import React, { useLayoutEffect } from "react";
import SearchCountResult from "../Components/Utilits/SearchCountResult";
import SideFilter from "../Components/Utilits/SideFilter";
import Pagination from "../Components/Utilits/Pagination";
import ViewSearchProductsHook from "./../hook/product/view-search-products";

const Categories = () => {
  const [
    productsList,
    pageCount,
    onPress,
    getProducts,
    results,
    onChangePrice,
    From,
    To,
  ] = ViewSearchProductsHook();
  // if (productsList) {
  //   console.log(productsList);
  //   console.log(pageCount);
  //   console.log(getPage);
  // }

  return (
    <>
      <div className="container mx-auto">
        {/* <SearchCountResult title="400 search result" /> */}

        <SideFilter products={productsList} />
        {pageCount > 1 ? (
          <Pagination pageCount={pageCount} onPress={onPress} />
        ) : null}
      </div>
    </>
  );
};

export default Categories;
