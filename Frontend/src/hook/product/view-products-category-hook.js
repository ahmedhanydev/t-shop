import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsSearch,
  getProductsByCategory,
} from "../../redux/actions/productAction";
const ViewProductsByCategoryHook = (id) => {
  const dispatch = useDispatch();
  let limit = 8;

  const getProducts = async () => {
    await dispatch(getProductsByCategory(id, limit, ""));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const products = useSelector((state) => state.products.productsCategory);

  let productsList = [];
  if (products) {
    productsList = products.data;
  } else {
    productsList = [];
  }

  const onPress = async (page) => {
    await dispatch(getProductsByCategory(id, limit, page));
  };

  let pageCount = 0;
  if (products.paginationResult) {
    pageCount = products.paginationResult.numberOfPages;
  } else {
    pageCount = 0;
  }

  return [productsList, onPress, pageCount];
};

export default ViewProductsByCategoryHook;
