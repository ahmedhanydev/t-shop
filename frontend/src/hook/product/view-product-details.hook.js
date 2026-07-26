import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  getRelatedProducts,
} from "../../redux/actions/productAction";
import productOne from "../../assets/images/Iphone.png";
import { getOneCategory } from "../../redux/actions/categoryAction";
import { getOneBrand } from "../../redux/actions/brandAction";

const ViewProductDetailsHook = (prodID) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [loadingRelated, setLoadingRelated] = useState(true);
  const [imagesList, setImagesList] = useState([]);

  const [products, setProducts] = useState([]);
  const [item, setItem] = useState([]);
  // console.log(id);
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      await dispatch(getProductDetails(prodID));
      setLoading(false);
    };
    getProduct();
  }, []);

  const oneProduct = useSelector((state) => state.products.oneProduct);
  const oneCategory = useSelector((state) => state.allCategory.oneCategory);
  const oneBrand = useSelector((state) => state.allBrand.oneBrand);
  const relatedProducts = useSelector(
    (state) => state.products.relatedProducts
  );

  // let imagesList = [];
  useEffect(() => {
    if (loading === false) {
      if (oneProduct && oneProduct.data) {
        // console.log(oneProduct.data);
        setItem(oneProduct.data);
        let listImages = [];
        if (oneProduct.data.images) {
          oneProduct.data.images.map((img) => {
            return listImages.push({
              original: `${img.url}`,
              thumbnail: `${img.url}`,
            });
          });

          setImagesList(listImages);
        } else {
          setImagesList([
            {
              original: `${productOne}`,
              thumbnail: `${productOne}`,
            },
          ]);
        }
      }
    }
  }, [loading]);

  useEffect(() => {
    if (item && item.category) {
      setLoadingRelated(true);
      dispatch(getRelatedProducts(item.category._id));
      setLoadingRelated(false);
    }
  }, [item]);

  useEffect(() => {
    if (loadingRelated === false) {
      if (relatedProducts && relatedProducts.data) {
        setProducts(relatedProducts.data.slice(0, 4));
        console.log(products);
      }
    }
  }, [loadingRelated]);

  return [item, imagesList, products];
};

export default ViewProductDetailsHook;
