import React from "react";
import CategoryContainer from "../Components/Category/CategoryContainer";
import Pagination from "../Components/Utilits/Pagination";
import AllCategoryHook from "../hook/category/all-category-hook";

const AllCategory = () => {
  const [categories, loading, pageCount, onPress] = AllCategoryHook();
  return (
    <div className="my-10">
      <CategoryContainer categories={categories} loading={loading} />
      {pageCount > 1 && <Pagination pageCount={pageCount} onPress={onPress} />}
    </div>
  );
};

export default AllCategory;
