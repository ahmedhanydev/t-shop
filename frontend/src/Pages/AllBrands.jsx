import React from "react";
import BrandsContainer from "../Components/Brands/BrandsContainer";
import Pagination from "../Components/Utilits/Pagination";
import AllBrandHook from "../hook/brand/all-brand-hook";

const AllBrands = () => {
  const [brandItems, loading, pageCount, getPage] = AllBrandHook();
  return (
    <>
      <BrandsContainer data={brandItems} loading={loading} />
      {pageCount > 1 && <Pagination pageCount={pageCount} onPress={getPage} />}
    </>
  );
};

export default AllBrands;
