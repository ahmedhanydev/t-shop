import React from "react";
import SubTitle from "../Utilits/SubTitle";
import CategoryCard from "../Category/CategoryCard";
import HomeCategoryHook from "../../hook/category/home-category-hook";

const HomeCategory = () => {
  const [items, loading] = HomeCategoryHook();

  return (
    <>
      {items ? (
        <div className="container mx-auto my-20">
          <SubTitle
            title="Shop by Category"
            btnTitle="Browse all categories →"
            path="/allcategory"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  place-content-center  place-items-center gap-y-8">
            {loading === false ? (
              items.length > 0 ? (
                items.map((category, index) => {
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
              )
            ) : (
              <div
                className="flex justify-center  items-center text-center w-96   "
                // style={{ marginLeft: "600px" }}
              >
                <i
                  className="pi pi-spin pi-spinner"
                  style={{ fontSize: "2.5rem" }}
                ></i>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default HomeCategory;
