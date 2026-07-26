import React from "react";
import RatePost from "./RatePost";
import RateItem from "./RateItem";
import Pagination from "./../Utilits/Pagination";
import { useParams } from "react-router-dom";
import ViewProductDetailsHook from "../../hook/product/view-product-details.hook";
import ViewAllReviewHook from "../../hook/review/view-all-review-hook";

const RateContainer = () => {
  const { id } = useParams();
  const [item, images, category, brand, products] = ViewProductDetailsHook(id);
  const [res, onPress] = ViewAllReviewHook(id);

  let rateQty = 0;
  let rateAvg = 0;
  if (item) {
    rateAvg = item.ratingsAverage;
    rateQty = item.ratingsQuantity;
  }
  return (
    <div className="container mx-auto border-2 p-5 my-10">
      <div className="flex gap-2 items-center  mb-5">
        <h3 className="text-xl  font-semibold">Reviews</h3>
        <p
          className="font-bold flex justify-center items-center gap-1 text-lg"
          style={{ color: "#ffd700" }}
        >
          {rateAvg && rateAvg.toFixed(2)}
          <i className="pi pi-star-fill" style={{ color: "#ffd700" }}></i>
          <span className="text-sm" style={{ color: "#A0A0A0" }}>
            ({rateQty} review)
          </span>
        </p>
      </div>
      <RatePost />
      <div className="my-20 px-10">
        {res.data ? (
          res.data.map((review, index) => {
            return <RateItem key={index} review={review} />;
          })
        ) : (
          <p className="text-gray-950">There are no ratings yet</p>
        )}
      </div>
      {res.paginationResult && res.paginationResult.numberOfPages >= 2 ? (
        <Pagination
          pageCount={
            res.paginationResult ? res.paginationResult.numberOfPages : 0
          }
          onPress={onPress}
        />
      ) : null}
    </div>
  );
};

export default RateContainer;
