import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../../redux/actions/wishlistAction";
import notify from "../../hook/useNotifiction";
const ProductsContainerHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [favList, setFavList] = useState([]);

  const res = useSelector((state) => state.wishlistReducer.userWishlist);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      await dispatch(getUserWishlist());
      setLoading(false);
    };
    get();
  }, []);

  useEffect(() => {
    if (loading === false) {
      if (res) {
        // console.log(res);
        if (res.status === "success") {
          let idList = res.data;

          setFavList(idList.map((item) => item._id));
        }
      }
    }
  }, [loading]);

  return [favList];
};

export default ProductsContainerHook;
