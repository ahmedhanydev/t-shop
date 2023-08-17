import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsSearch } from "../../redux/actions/productAction";
const ViewSearchProductsHook = () => {
  const dispatch = useDispatch();
  let limit = 9;

  const getProducts = async () => {
    getStorage();
    sortData();

    await dispatch(
      getAllProductsSearch(
        `sort=${sort}&limit=${limit}&keyword=${word}&${queryCat}&${queryBrand}&price[gt]=${priceFrom}&price[lte]=${priceTo}`
      )
    );
  };

  useEffect(() => {
    getProducts();
  }, []);
  const products = useSelector((state) => state.products.allProducts);

  let productsList = [];
  if (products) {
    productsList = products.data;
  } else {
    productsList = [];
  }
  const onPress = async (page) => {
    getStorage();
    sortData();
    await dispatch(
      getAllProductsSearch(
        `sort=${sort}&limit=${limit}&page=${page}&keyword=${word}&${queryCat}&${queryBrand}&price[gt]=${priceFrom}&price[lte]=${priceTo}`
      )
    );
  };
  let word = "";
  let queryCat = "";
  let queryBrand = "";
  let priceFrom = 0;
  let priceTo = 0;

  const getStorage = () => {
    if (localStorage.getItem("searchWord") != null) {
      word = localStorage.getItem("searchWord");
    }

    if (localStorage.getItem("queryCat") != null) {
      queryCat = localStorage.getItem("queryCat");
    }

    if (localStorage.getItem("queryBrand") != null) {
      queryBrand = localStorage.getItem("queryBrand");
    }

    if (localStorage.getItem("priceFrom") != null) {
      priceFrom = localStorage.getItem("priceFrom");
    }
    if (localStorage.getItem("priceTo") != null) {
      priceTo = localStorage.getItem("priceTo");
    }
  };
  let pageCount = 0;
  if (products && products.paginationResult) {
    pageCount = products.paginationResult.numberOfPages;
  }

  let results = 0;
  if (products && products.results) {
    results = products.results;
  } else {
    results = 0;
  }

  let sortType = "";
  let sort = "";

  const sortData = () => {
    if (localStorage.getItem("sortKey") != null) {
      // console.log(localStorage.getItem("sortKey"));
      sortType = localStorage.getItem("sortKey");
    } else {
      sortType = " ";
    }
    if (sortType === "Not Sort") {
      sort = "";
    } else if (sortType === "Best Rating") {
      sort = "-ratingsQuantity";
    } else if (sortType === "Price: Low to High") {
      sort = "+price";
    } else if (sortType === "Price: High to Low") {
      sort = "-price";
    }
  };
  const [From, setFrom] = useState(0);
  const [To, setTo] = useState(0);

  const onChangePrice = (value) => {
    localStorage.setItem("priceFrom", value[0]);
    setFrom(value[0]);
    localStorage.setItem("priceTo", value[1]);

    setTo(value[1]);
  };
  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, [From, To]);

  return [
    productsList,
    pageCount,
    onPress,
    getProducts,
    results,
    onChangePrice,
    From,
    To,
  ];
};

export default ViewSearchProductsHook;
