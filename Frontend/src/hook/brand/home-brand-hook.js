import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrand } from "../../redux/actions/brandAction";
const HomeBrandHook = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getAllBrand(5));
      setLoading(false);
    };
    get();
  }, []);

  const brands = useSelector((state) => state.allBrand.brand);
  // const loading = useSelector((state) => state.allBrand.loading);

  // let items = [];
  // if (brands) {
  //   items = brands.data;
  // } else {
  //   items = [];
  // }

  useEffect(() => {
    if (loading === false) {
      if (brands) {
        setItems(brands.data);
      }
    }
  }, [loading]);

  return [items, loading];
};

export default HomeBrandHook;
