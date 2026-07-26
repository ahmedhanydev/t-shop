import React, { useEffect, useRef, useState } from "react";
import notify from "../useNotifiction";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview } from "../../redux/actions/reviewAction";

const DeleteReviewHook = (review) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);

  const cancelButtonRef = useRef(null);
  let user = JSON.parse(localStorage.getItem("user"));
  let isUser = false;
  if (JSON.parse(localStorage.getItem("user")) != null) {
    if (review.user._id === user._id) {
      isUser = true;
    }
  }

  const res = useSelector((state) => state.reviewReducer.deleteReview);

  const handelDelete = async () => {
    setOpenDelete(false);

    setLoading(true);
    await dispatch(deleteReview(review._id));
    setLoading(false);

    // window.location.reload();
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        if (res.message) {
          notify(res.message, "success");
          setTimeout(() => {
            window.location.reload(false);
          }, 1000);
        } else {
          notify("delete review is filed", "error");
        }
      }
    }
  }, [loading]);

  return [openDelete, setOpenDelete, cancelButtonRef, isUser, handelDelete];
};

export default DeleteReviewHook;
