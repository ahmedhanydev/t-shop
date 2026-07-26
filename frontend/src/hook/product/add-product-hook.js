import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllCategory,
  getAllCategoryPage,
} from "../../redux/actions/categoryAction";
import uploadImg from "../../assets/images/upload.png";
import { getAllBrand } from "../../redux/actions/brandAction";
import { getSubCategories } from "../../redux/actions/subcategoryAction";
import { createProduct } from "../../redux/actions/productAction";
import notify from "../../hook/useNotifiction";

const AddProductHook = () => {
  const [prodNameEg, setProdNameEg] = useState("");
  const [prodNameAr, setProdNameAr] = useState("");
  const [prodDescEg, setProdDescEg] = useState("");
  const [prodDescAr, setProdDescAr] = useState("");
  const [priceAfterValue, setPriceAfterValue] = useState(null);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(null);
  const [img, setImg] = useState(uploadImg);
  const [selectedImage, setSelectedImage] = useState(null);
  const [catID, setCatID] = useState("");
  const [brandID, setBrandID] = useState("");
  const [selectedSubID, setSelectedSubID] = useState([]);
  const [images, setImages] = useState({});
  const [colors, setColors] = useState([]);
  const [options, setOptions] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory(50));
    dispatch(getAllBrand());
  }, []);

  const categories = useSelector((state) => state.allCategory.category);

  let categoriesList = [];
  if (categories) {
    if (categories.data) {
      // eslint-disable-next-line array-callback-return
      categories.data.map((item) => {
        categoriesList.push({ label: item.name, value: item._id });
      });
    }
  }

  const brands = useSelector((state) => state.allBrand.brand);

  let brandsEgList = [];
  if (brands) {
    if (brands.data) {
      // eslint-disable-next-line array-callback-return
      brands.data.map((item) => {
        brandsEgList.push({ label: item.name, value: item._id });
      });
    }
  }

  const onChangeNameEg = (e) => {
    setProdNameEg(e.target.value);
  };
  const onChangeNameAr = (e) => {
    setProdNameAr(e.target.value);
  };
  const onChangeDescEg = (e) => {
    setProdDescEg(e.target.value);
  };
  const onChangeDescAr = (e) => {
    setProdDescAr(e.target.value);
  };
  const onChangePriceAfter = (e) => {
    setPriceAfterValue(e.target.value);
  };
  const onChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const onChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  // const onChangeCat = (e) => {
  //   setCatID(e.target.value);
  // };
  // const onChangeBrand = (e) => {
  //   setBrandID(e.target.value);
  // };

  const onSelectCategory = async (e) => {
    if (e.target.value !== "") {
      await dispatch(getSubCategories(e.target.value));
    }
    setCatID(e.target.value);
  };

  const subcategories = useSelector((state) => state.subcategory.subcategory);
  // if (subcategories) {
  //   console.log({ data: subcategories.data });
  // }

  useEffect(() => {
    if (catID !== "") {
      if (subcategories.data) {
        setOptions(subcategories.data.data);
      }
    }
  }, [catID]);

  const onSelectBrand = (e) => {
    setBrandID(e.target.value);
  };

  // ! handle colors
  const handleChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    setShow(!show);
  };
  const removeColor = (color) => {
    const newColors = colors.filter((e) => e !== color);
    setColors(newColors);
  };

  const onSelect = (selectedList) => {
    setSelectedSubID(selectedList);
  };
  const onRemove = (selectedList) => {
    setSelectedSubID(selectedList);
  };
  // const onImageChange = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImg(URL.createObjectURL(e.target.files[0]));
  //     setSelectedImage(e.target.files[0]);
  //   }
  // };
  //to convert base 64 to file
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  // to send data to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prodNameEg === "") {
      notify("Product Name (English) is required", "warn");
      return;
    } else if (prodNameAr === "") {
      notify("Product Name (Arabic) is required", "warn");
      return;
    } else if (prodDescEg === "") {
      notify("Product description (English) is required", "warn");
      return;
    } else if (prodDescAr === "") {
      notify("Product description (Arabic) is required", "warn");
    } else if (quantity === null) {
      notify("Product quantity  is required", "warn");
      return;
    } else if (price === 0) {
      notify("Product price  is required", "warn");
      return;
    } else if (catID === "") {
      notify("choose category", "warn");
      return;
    } else if (images.length <= 0) {
      notify("add product images", "warn");
      return;
    }
    // to convert from base64 to file
    const imgCover = dataURLtoFile(images[0], Math.random() + ".png");
    // to convert from array to file
    const itemImages = Array.from(Array(Object.keys(images).length).keys()).map(
      (item, index) => {
        return dataURLtoFile(images[index], Math.random() + ".png");
      }
    );

    const formData = new FormData();
    formData.append("title", prodNameEg);
    formData.append("titleAr", prodNameAr);
    formData.append("description", prodDescEg);
    formData.append("descriptionAr", prodDescAr);
    formData.append("price", price);
    formData.append("priceAfterDiscount", priceAfterValue);
    formData.append("quantity", quantity);
    formData.append("category", catID);
    formData.append("brand", brandID);

    setTimeout(() => {
      formData.append("imageCover", imgCover);
      itemImages.map((item) => formData.append("images", item));
    }, 1000);

    setTimeout(() => {
      console.log(imgCover);
      console.log(itemImages);
    }, 1000);

    colors.map((color) => {
      return formData.append("colors", color);
    });

    // itemImages.map((img) => {
    //   return formData.append("images", img);
    // });

    selectedSubID.map((item) => {
      return formData.append("subcategories", item._id);
    });

    // console.log(formData);
    setTimeout(async () => {
      setLoading(true);
      await dispatch(createProduct(formData));
      setLoading(false);
    }, 1000);
  };
  const product = useSelector((state) => state.products.createProduct);

  useEffect(() => {
    if (loading === false) {
      setProdNameEg("");
      setProdNameAr("");
      setProdDescEg("");
      setProdDescAr("");
      setPriceAfterValue(null);
      setPrice(null);
      setQuantity(null);
      setSelectedImage(null);
      setCatID("");
      setBrandID("");
      setSelectedSubID([]);
      setImages([]);
      setColors([]);
      setOptions([]);
      setTimeout(() => setLoading(false), 1500);
      if (product) {
        console.log(product);
        if (product.status === 201) {
          notify("product is created", "success");
        } else {
          notify("there error in data", "error");
        }
      }
    }
  }, [loading]);

  return [
    categoriesList,
    brandsEgList,
    onSelectCategory,
    options,
    onSelectBrand,
    handleChangeComplete,
    removeColor,
    onSelect,
    onRemove,
    handleSubmit,
    images,
    setImages,
    colors,
    show,
    setShow,
    onChangeNameEg,
    onChangeNameAr,
    onChangeDescEg,
    onChangeDescAr,
    onChangePriceAfter,
    onChangePrice,
    onChangeQuantity,
    prodNameEg,
    prodNameAr,
    prodDescEg,
    prodDescAr,
    priceAfterValue,
    price,
    quantity,
    catID,
    brandID,
  ];
};

export default AddProductHook;
