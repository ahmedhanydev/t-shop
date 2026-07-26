import React, { useLayoutEffect, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  getAllCategoryPage,
} from "../../redux/actions/categoryAction";
const AllCategoryHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getAllCategory(10));
      setLoading(false);
    };
    get();
  }, []);

  const res = useSelector((state) => state.allCategory.category);
  // const loading = useSelector((state) => state.allCategory.loading);

  let pageCount = 0;
  if (res) {
    if (res.paginationResult) {
      pageCount = res.paginationResult.numberOfPages;
    }
  }

  const onPress = (page) => {
    // getAllCategoryPage();
    dispatch(getAllCategoryPage(page));
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        console.log(res);
        setCategories(res.data);
      } else {
        setCategories([]);
      }
    }
  }, [loading]);

  // to start page from top
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return [categories, loading, pageCount, onPress];
};

export default AllCategoryHook;
