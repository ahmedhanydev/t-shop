import React, { useEffect, useRef, useState } from "react";
import notify from "../useNotifiction";
import { useDispatch, useSelector } from "react-redux";
import { updateReview } from "../../redux/actions/reviewAction";

const EditReviewHook = (review) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [newRateValue, setNewRateValue] = useState(review.ratings);
  const [newRateText, setNewRateText] = useState(review.title);

  const cancelButtonRefEdit = useRef(null);

  const res = useSelector((state) => state.reviewReducer.updateReview);
  const onChangeNewRateText = (val) => {
    setNewRateText(val);
  };

  const onChangeNewRateValue = (val) => {
    setNewRateValue(val);
  };
  //   console.log(newRateValue, newRateText);
  const handelEdit = async () => {
    setOpenEdit(false);

    setLoading(true);
    await dispatch(
      updateReview(review._id, {
        title: newRateText,
        ratings: newRateValue,
      })
    );

    setLoading(false);

    // window.location.reload();
  };

  useEffect(() => {
    if (loading === false) {
      if (res) {
        notify("change review is successfully", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
        notify("change  review is filed", "error");
      }
    }
  }, [loading]);

  return [
    openEdit,
    setOpenEdit,
    cancelButtonRefEdit,
    handelEdit,
    newRateValue,
    newRateText,
    onChangeNewRateText,
    onChangeNewRateValue,
  ];
};

export default EditReviewHook;
