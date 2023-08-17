import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import bgOne from "../../assets/images/R2.jpg";
import bgTwo from "../../assets/images/R.png";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div>
            <img src={bgOne} className="relative " alt="" />
            <Link to="/categories" className=" ">
              <button className="btn text-white  justify-center items-center  hidden lg:flex w-60 h-14 bg-gray-600 absolute top-[100px] right-[100px]">
                Shop Now
              </button>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <img src={bgTwo} className="relative  " alt="" />
            <Link to="/categories" className=" ">
              <button className="btn text-white  justify-center items-center hidden lg:flex w-60 h-14 bg-gray-600 absolute top-[100px] right-[100px]">
                Shop Now
              </button>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
