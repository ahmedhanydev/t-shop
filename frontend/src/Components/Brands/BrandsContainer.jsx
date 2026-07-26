import React from "react";
import SubTitle from "../Utilits/SubTitle";
import BrandCard from "./BrandCard";
import brandOne from "../../assets/images/brands/apple.png";
import brandTwo from "../../assets/images/brands/dell.png";
import brandThree from "../../assets/images/brands/lenovo.png";
import brandFour from "../../assets/images/brands/oppo.png";
import brandFive from "../../assets/images/brands/samsung.png";
const BrandsContainer = ({ data, loading }) => {
  return (
    <>
      <div className="container mx-auto my-20">
        <SubTitle title="All Brands" />
        <div className="grid grid-cols-1 lg:grid-cols-5 place-content-center place-items-center gap-y-8">
          {loading === false ? (
            data ? (
              data.map((brand, index) => {
                return (
                  <BrandCard id={brand._id} key={index} img={brand.image.url} />
                );
              })
            ) : (
              <h2>categories is empty</h2>
            )
          ) : (
            <div
              className="   "
              // style={{ marginLeft: "600px" }}
            >
              <i
                className="pi pi-spin pi-spinner"
                style={{ fontSize: "2.5rem" }}
              ></i>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BrandsContainer;
