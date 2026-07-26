import React, { useEffect } from "react";
import Slider from "../Components/Home/Slider";
import HomeCategory from "../Components/Home/HomeCategory";
import ProductsContainer from "../Components/Products/ProductsContainer";
import HomeDiscount from "../Components/Home/HomeDiscount";
import HomeBrands from "../Components/Home/HomeBrands";
import ViewHomeProductsHook from "../hook/product/view-home-products-hook";

const Home = () => {
  const [items] = ViewHomeProductsHook();
  return (
    <div>
      <Slider />
      <HomeCategory />
      <ProductsContainer
        products={items}
        title="Best Seller"
        btnTitle="See Everything →"
        path="/categories"
      />
      <HomeDiscount />
      <ProductsContainer
        products={items}
        title="New Arrivals"
        btnTitle="See Everything →"
        path="/categories"
      />
      <HomeBrands />
    </div>
  );
};

export default Home;
