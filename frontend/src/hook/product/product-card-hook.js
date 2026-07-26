import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from "../../redux/actions/wishlistAction";
import notify from "./../../hook/useNotifiction";
const ProductCardHook = (favList, id) => {
  const dispatch = useDispatch();

  const [isFavIcon, setIsFavIcon] = useState(false);
  const [addLoading, setAddLoading] = useState(true);
  const [removeLoading, setRemoveLoading] = useState(true);
  let Fav = favList.some((itemID) => itemID === id);
  const [isFav, setIsFav] = useState(Fav);

  useEffect(() => {
    setIsFav(favList.some((itemID) => itemID === id));
  }, [favList]);
  // console.log(isFavIcon);
  // console.log(isFav);

  const resAdd = useSelector((state) => state.wishlistReducer.addToWishlist);
  const resRemove = useSelector(
    (state) => state.wishlistReducer.removeFromWishlist
  );

  const handelFav = () => {
    if (isFav) {
      removeWishlistData();
    } else {
      addWishlistData();
    }
  };

  useEffect(() => {
    if (isFav === true) {
      setIsFavIcon(true);
    } else {
      setIsFavIcon(false);
    }
  }, [isFav]);

  const addWishlistData = async () => {
    setIsFav(true);
    setIsFavIcon(true);
    setAddLoading(true);
    await dispatch(
      addProductToWishlist({
        productId: id,
      })
    );
    setAddLoading(false);

    // if (resAdd && resAdd.status === "success") {
    //   notify(resAdd.message, "success");
    // }
  };
  useEffect(() => {
    if (addLoading === false) {
      if(resAdd){
        console.log(resAdd);
      }
      if (resAdd && resAdd.status === 500) {
        notify("you not login please login and try again", "error");
      }
    }
  }, [addLoading]);

  useEffect(() => {
    if (removeLoading === false) {
      if (resRemove && resRemove.status === 500) {
        notify("you not login please login and try again", "error");
      }
    }
  }, [removeLoading]);

  const removeWishlistData = async () => {
    setIsFav(false);
    setIsFavIcon(false);
    setRemoveLoading(true);
    await dispatch(removeProductFromWishlist(id));
    setRemoveLoading(false);

    // if (resRemove && resRemove.status === "success") {
    //   notify(resRemove.message, "success");
    // }
  };

  return [isFavIcon, handelFav];
};

export default ProductCardHook;
