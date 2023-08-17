import React from "react";
import CategoryCard from "./CategoryCard";
import SubTitle from "../Utilits/SubTitle";

const CategoryContainer = ({ categories, loading }) => {
  // let categoriesList = [];
  // if (categories) {
  //   categoriesList = categories.data;
  // }
  console.log(categories);
  // console.log(loading);

  return (
    <div className="container mx-auto mt-20">
      <SubTitle title="All Categories" />
      <div className="grid grid-cols-1 lg:grid-cols-5 place-content-center place-items-center gap-y-8">
        {categories.length > 0 ? (
          categories.map((category, index) => {
            return (
              <CategoryCard
                key={index}
                title={category.name}
                id={category._id}
                img={category.image.url}
              />
            );
          })
        ) : (
          <h2>categories is empty</h2>
        )}
      </div>
    </div>
  );
};

export default CategoryContainer;
