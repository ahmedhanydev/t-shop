import React, { useEffect, useState } from "react";
import notify from "../useNotifiction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../redux/actions/authAction";
import {
  createReview,
  getAllReviewProduct,
} from "../../redux/actions/reviewAction";
import reviewReducer from "./../../redux/reducers/reviewReducer";

const ViewAllReviewHook = (id) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const res = useSelector((state) => state.reviewReducer.allReviewProduct);

  useEffect(() => {
    setLoading(true);

    dispatch(getAllReviewProduct(id, 1, 5));
    setLoading(false);
  }, []);

  const onPress = async (page) => {
    await dispatch(getAllReviewProduct(id, page, 5));
  };
  return [res, onPress];
};

export default ViewAllReviewHook;
