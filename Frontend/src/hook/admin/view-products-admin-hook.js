import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getAllProductsPage,
} from "../../redux/actions/productAction";
const ViewProductsAdminHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts(9));
  }, []);
  const products = useSelector((state) => state.products.allProducts);
  //   console.log(products);
  let productsList = [];
  if (products.data) {
    productsList = products.data;
  } else {
    productsList = [];
  }
  const getPage = async (page) => {
    // getAllCategoryPage();
    await dispatch(getAllProductsPage(page));
    console.log(page);
  };

  let pageCount = 0;
  if (products.paginationResult) {
    pageCount = products.paginationResult.numberOfPages;
  }

  return [productsList, pageCount, getPage];
};

export default ViewProductsAdminHook;
