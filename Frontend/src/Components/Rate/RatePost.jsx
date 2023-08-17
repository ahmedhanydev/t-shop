import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { InputTextarea } from "primereact/inputtextarea";
import ReactStars from "react-rating-stars-component";
import AddRateHook from "../../hook/review/add-rate-hook";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const RatePost = () => {
  const { id } = useParams();

  const toast = useRef(null);

  const [
    rateText,
    rateValue,
    onChangeRateText,
    onChangeRateValue,
    onSubmit,
    user,
  ] = AddRateHook(id);

  // const show = () => {
  //   toast.current.show({
  //     severity: "success",
  //     summary: "Form Submitted",
  //     detail: form.getValues("description"),
  //   });
  // };

  let name = "";
  if (user) {
    name = user.name;
  }
  const defaultValues = { review: "" };
  // const form = useForm({ defaultValues });

  // const onSubmit = (data) => {
  //   data.review && show();

  //   form.reset();
  // };

  const ratingChanged = (newRating) => {
    onChangeRateValue(newRating);
  };
  return (
    <div className="px-5">
      <div className="flex justify-center items-center gap-2">
        <p className="text-xl font-semibold">{name}</p>
        <ReactStars
          value={rateValue}
          count={5}
          onChange={ratingChanged}
          size={28}
          isHalf={true}
          emptyIcon={<i className="far fa-star"></i>}
          halfIcon={<i className="fa fa-star-half-alt"></i>}
          fullIcon={<i className="fa fa-star"></i>}
          activeColor="#ffd700"
        />
      </div>

      <div className="card flex justify-center">
        <form className="flex flex-col gap-3">
          <div className="mt-2 hidden lg:block">
            <InputTextarea
              onChange={(e) => onChangeRateText(e.target.value)}
              autoResize
              rows={3}
              cols={60}
            />
          </div>
          <div className="mt-2 lg:hidden">
            <InputTextarea
              onChange={(e) => onChangeRateText(e.target.value)}
              autoResize
              rows={3}
              cols={20}
            />
          </div>
          <div className="flex justify-center items-center">
            <Button
              label="Submit"
              onClick={onSubmit}
              className="hover:opacity-90 w-1/2 lg:w-1/4 "
              style={{ backgroundColor: "#6366F1" }}
              type="submit"
              //   icon="pi pi-check"
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RatePost;
