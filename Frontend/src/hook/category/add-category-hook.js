import React, { useState } from "react";
import uploadImg from "../../assets/images/upload.png";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../redux/actions/categoryAction";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import notify from "../../hook/useNotifiction";
const AddCategoryHook = () => {
  const [img, setImg] = useState(uploadImg);
  const [selectedImage, setSelectedImage] = useState(null);
  const [nameEg, setNameEg] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPress, setIsPress] = useState(false);
  const dispatch = useDispatch();

  const onChangeNameEg = (event) => {
    setNameEg(event.target.value);
  };
  const onChangeNameAr = (event) => {
    setNameAr(event.target.value);
  };
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      setSelectedImage(e.target.files[0]);
    }
  };
  const res = useSelector((state) => state.allCategory.category);
  console.log(res);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nameEg === "" && nameAr === "" && selectedImage === null) {
      notify("please enter category data", "warn");

      return;
    }
    const formData = new FormData();

    formData.append("name", nameEg);
    formData.append("nameAr", nameAr);
    formData.append("image", selectedImage);
    setLoading(true);
    setIsPress(true);
    await dispatch(createCategory(formData));
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false) {
      setSelectedImage(null);
      setNameEg("");
      setNameAr("");
      setImg(uploadImg);
      setLoading(true);
      setTimeout(() => setIsPress(false), 1000);
      if (res.status === 201) {
        notify("category is created", "success");
      } else {
        notify("there error in data", "error");
      }
    }
  }, [loading]);

  return [
    img,
    nameEg,
    nameAr,
    loading,
    isPress,
    onImageChange,
    handleSubmit,
    onChangeNameEg,
    onChangeNameAr,
  ];
};

export default AddCategoryHook;
