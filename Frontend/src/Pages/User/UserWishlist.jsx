import React, { useEffect, useState } from "react";
import UserWishlistProductCard from "../../Components/User/UserWishlistProductCard";
import Pagination from "../../Components/Utilits/Pagination";
import ProductsContainer from "../../Components/Products/ProductsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../../redux/actions/wishlistAction";

const UserWishlist = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

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
        if (res.status === "success") {
          setItems(res.data);
        }
      }
    }
  }, [loading]);

  return (
    <div className="container mx-auto">
      <div className="pl-5 flex justify-center border-b-2 pb-4 mx-10 mb-5">
        <h1 className="font-bold text-lg lg:text-xl">Wishlist</h1>
      </div>
      <div className=" lg:col-span-3">
        {items && items.length <= 0 ? (
          <div className="flex justify-center items-center">
            <p className="text-lg font-bold">There No Favorite Products</p>
          </div>
        ) : (
          <ProductsContainer products={items} girdValue={3} />
        )}
      </div>
    </div>
  );
};

export default UserWishlist;
