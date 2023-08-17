import React, { useEffect } from "react";
import { useState } from "react";
import ViewSearchProductsHook from "../product/view-search-products";
import { useNavigate } from "react-router-dom";

const NavbarSearchHook = () => {
  const [productsList, pageCount, onPress, getProducts, results] =
    ViewSearchProductsHook();
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();
  const onChangeSearchWord = (e) => {
    localStorage.setItem("searchWord", e.target.value);

    setSearchWord(e.target.value);

    const path = window.location.pathname;
    if (path != "/categories") {
      navigate("/categories");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, [searchWord]);

  return [onChangeSearchWord, searchWord];
};

export default NavbarSearchHook;
