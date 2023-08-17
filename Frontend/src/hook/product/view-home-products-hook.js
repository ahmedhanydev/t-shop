import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/productAction";
const ViewHomeProductsHook = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const products = useSelector((state) => state.products.allProducts);

  let items = [];
  if (products.data) {
    items = products.data.slice(0, 4);
  } else {
    items = [];
  }

  return [items];
};

export default ViewHomeProductsHook;
