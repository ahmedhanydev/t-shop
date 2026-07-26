import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "./../../redux/actions/categoryAction";
import { getAllBrand } from "../../redux/actions/brandAction";
import ViewSearchProductsHook from "../product/view-search-products";

const SideFilterHook = () => {
  const dispatch = useDispatch();
  const [productsList, pageCount, onPress, getProducts, results] =
    ViewSearchProductsHook();

  const [loadingCat, setLoadingCat] = useState(true);
  const [loadingBrand, setLoadingBrand] = useState(true);
  const [brandList, setBrandList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    const run = async () => {
      setLoadingCat(true);
      await dispatch(getAllCategory(50));
      setLoadingCat(false);
      setLoadingBrand(true);
      await dispatch(getAllBrand(50));
      setLoadingBrand(false);
    };
    run();
  }, []);

  const brands = useSelector((state) => state.allBrand.brand);
  const categories = useSelector((state) => state.allCategory.category);
  useEffect(() => {
    if (loadingCat === false) {
      if (categories) {
        if (categories.data) {
          let category = [];

          // eslint-disable-next-line array-callback-return
          categories.data.map((item) => {
            return category.push({
              value: item._id,
              label: item.name,
              checked: false,
            });
          });
          setCategoryList(category);
        }
      }
    }
  }, [loadingCat]);
  // console.log({ cat: categoryList });

  useEffect(() => {
    if (loadingBrand === false) {
      if (brands) {
        if (brands.data) {
          let brand = [];
          // eslint-disable-next-line array-callback-return
          brands.data.map((item) => {
            return brand.push({
              value: item._id,
              label: item.name,
              checked: false,
            });

            // return item;
          });
          setBrandList(brand);
        }
      }
    }
  }, [loadingBrand]);

  // console.log({ bra: brandList });

  const [catChecked, setCatChecked] = useState([]);
  var queryCat = "";

  const clickCategory = (e) => {
    let value = e.target.value;
    if (e.target.checked) {
      if (value !== 0) {
        setCatChecked([...catChecked, value]);
      }
    }
    if (e.target.checked === false) {
      let newArray = catChecked.filter((e) => e !== value);
      setCatChecked(newArray);
    }
  };

  useEffect(() => {
    queryCat = catChecked.map((val) => "category=" + val).join("&");
    localStorage.setItem("queryCat", queryCat);
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, [catChecked]);

  const [brandChecked, setBrandChecked] = useState([]);
  var queryBrand = [];
  const clickBrand = (e) => {
    let value = e.target.value;
    if (e.target.checked) {
      if (value !== 0) {
        setBrandChecked([...brandChecked, value]);
      }
    }
    if (e.target.checked === false) {
      let newArray = brandChecked.filter((e) => e !== value);
      setBrandChecked(newArray);
    }
  };

  useEffect(() => {
    queryBrand = brandChecked.map((val) => "brand=" + val).join("&");
    localStorage.setItem("queryBrand", queryBrand);
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, [brandChecked]);

  //   console.log(brandChecked);
  return [categoryList, brandList, clickCategory, clickBrand];
};

export default SideFilterHook;
