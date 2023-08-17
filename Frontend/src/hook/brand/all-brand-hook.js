import React, { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBrand,
  getAllBrandPage,
} from "./../../redux/actions/brandAction";
const AllBrandHook = () => {
  const dispatch = useDispatch();
  const [brandItems, setBrandItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getAllBrand(10));
      setLoading(false);
    };
    get();
  }, []);

  const brands = useSelector((state) => state.allBrand.brand);
  // const loading = useSelector((state) => state.allBrand.loading);

  let pageCount = 0;

  if (brands) {
    if (brands.paginationResult) {
      pageCount = brands.paginationResult.numberOfPages;
    }
  }

  useEffect(() => {
    if (loading === false) {
      if (brands) {
        if (brands.data) {
          setBrandItems(brands.data);
        }
      }
    }
  }, [loading]);

  const getPage = (page) => {
    // getAllCategoryPage();
    dispatch(getAllBrandPage(page));
  };

  // to start page from top
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return [brandItems, loading, pageCount, getPage];
};

export default AllBrandHook;
