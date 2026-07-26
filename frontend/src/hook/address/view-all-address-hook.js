import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAddresses } from "../../redux/actions/addressAction";

const ViewAllAddressHook = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const get = async () => {
      await dispatch(getAllAddresses());
    };
    get();
  }, []);

  const res = useSelector((state) => state.addressReducer.allAddress);
  let addresses = [];

  if (res) {
    // console.log(res);
    if (res.status === "success") {
      addresses = res.data;
    }
  }
  //   useEffect(() => {
  //     if (loading === false) {

  //     }
  //   }, [loading]);

  return [addresses];
};

export default ViewAllAddressHook;
