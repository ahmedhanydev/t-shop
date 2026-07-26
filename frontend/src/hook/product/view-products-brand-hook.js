import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByBrand } from "../../redux/actions/productAction";
const ViewProductsByBrandHook = (id) => {
  const dispatch = useDispatch();
  let limit = 8;

  const getProducts = async () => {
    await dispatch(getProductsByBrand(id, limit, ""));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const products = useSelector((state) => state.products.productsBrand);

  let productsList = [];
  if (products) {
    productsList = products.data;
  } else {
    productsList = [];
  }

  const onPress = async (page) => {
    await dispatch(getProductsByBrand(id, limit, page));
  };

  let pageCount = 0;
  if (products.paginationResult) {
    pageCount = products.paginationResult.numberOfPages;
  } else {
    pageCount = 0;
  }

  return [productsList, onPress, pageCount];
};

export default ViewProductsByBrandHook;
