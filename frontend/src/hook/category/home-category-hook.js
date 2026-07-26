import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
const HomeCategoryHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getAllCategory(5));
      setLoading(false);
    };
    get();
  }, []);

  const categories = useSelector((state) => state.allCategory.category);
  // const loading = useSelector((state) => state.allCategory.loading);

  // let items = [];

  useEffect(() => {
    if (loading === false) {
      if (categories) {
        setItems(categories.data);
        console.log(categories.data);
      }
    }
  }, [loading]);

  // console.log(categories);
  // console.log(items);

  return [items, loading];
};

export default HomeCategoryHook;
