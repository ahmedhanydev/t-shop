import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryPage } from "../../redux/actions/categoryAction";
import notify from "../../hook/useNotifiction";
import { createSubcategory } from "../../redux/actions/subcategoryAction";
const AddSubcategoryHook = () => {
  const [nameEg, setNameEg] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(true);

  const onChangeNameAr = (e) => {
    setNameAr(e.target.value);
  };

  const onChangeNameEg = (e) => {
    setNameEg(e.target.value);
  };
  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (!navigator.onLine) {
      notify("There is a problem with the internet connection", "error");
      return;
    }
    dispatch(getAllCategoryPage());
  }, []);

  const categories = useSelector((state) => state.allCategory.category);
  let dataTest = [];
  if (categories.data) {
    // eslint-disable-next-line array-callback-return
    categories.data.map((item) => {
      dataTest.push({ label: item.name, value: item._id });
      // return item;
    });
  }

  const subcategories = useSelector((state) => state.subcategory.subcategory);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!navigator.onLine) {
      notify("There is a problem with the internet connection", "error");
      return;
    }
    if (nameAr === "") {
      notify("enter subcategory arabic name ", "warn");
    }
    if (nameEg === "") {
      notify("enter subcategory english name  ", "warn");
    }

    if (id === null) {
      notify("choose category ", "warn");
    }

    setLoading(true);
    await dispatch(
      createSubcategory({
        name: nameEg,
        nameAr: nameAr,
        category: id,
      })
    );
    setLoading(false);
  };
  useEffect(() => {
    if (loading === false) {
      setNameEg("");
      setNameAr("");
      setId(null);
      if (subcategories) {
        console.log(subcategories);
      }
      if (subcategories.status === 201) {
        notify("subcategory created successfully", "success");
      } else if (
        subcategories === "errorAxiosError: Request failed with status code 500"
      ) {
        notify("subcategory name already exist", "error");
      } else if (subcategories === "errorAxiosError: Network Error") {
        notify("There is a problem with the internet connection", "error");
      } else {
        notify("there error in data", "warn");
      }
      setLoading(true);
      //   console.log(loading);
    }
  }, [loading]);

  return [
    nameEg,
    nameAr,
    id,
    loading,
    onChangeNameAr,
    onChangeNameEg,
    dataTest,
    subcategories,
    handelSubmit,
    onChangeId,
  ];
};

export default AddSubcategoryHook;
