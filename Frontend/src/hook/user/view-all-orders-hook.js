import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../../redux/actions/orderAction";

const ViewAllOrdersHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState("");
  const [orders, setOrders] = useState([]);
  const [paginate, setPaginate] = useState([]);

  const get = async () => {
    setLoading(true);
    await dispatch(getAllOrders("", 5));
    setLoading(false);
  };

  useEffect(() => {
    get();
  }, []);
  const allOrders = useSelector((state) => state.orderReducer.allOrders);

  useEffect(() => {
    if (loading === false) {
      console.log(allOrders);
      if (allOrders.results) {
        setResults(allOrders.results);
      }
      if (allOrders.data) {
        setOrders(allOrders.data);
      }
      if (allOrders.paginationResult) {
        setPaginate(allOrders.paginationResult);
      }
    }
  }, [loading]);

  const onPress = async (page) => {
    setLoading(true);
    await dispatch(getAllOrders(page, 5));
    setLoading(false);
  };

  return [results, orders, paginate, onPress];
};

export default ViewAllOrdersHook;
