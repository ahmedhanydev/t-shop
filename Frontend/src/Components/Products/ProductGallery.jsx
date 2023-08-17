import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import productOne from "../../assets/images/Iphone.png";
import catImgOne from "../../assets/images/laptop.png";
import RightButton from "./RightButton";
import LeftButton from "./LeftButton";
import ViewProductDetailsHook from "../../hook/product/view-product-details.hook";
import { useParams } from "react-router-dom";

const ProductGallery = () => {
  const { id } = useParams();
  const [item, imagesList, products] = ViewProductDetailsHook(id);

  return (
    <div className="w-3/4  container mx-auto">
      <ImageGallery
        items={imagesList}
        defaultImage={productOne}
        showFullscreenButton={false}
        // isRTL={true}
        // thumbnailPosition={"left"}
        // originalWidth={"100px"}
        // originalHeight={"100px"}
        // thumbnailHeight={"100px"}
        // thumbnailWidth={"100px"}
        showPlayButton={false}
        // showThumbnails={false}
        // showBullets={false}
        showNav={false}
        // sizes={"250px"}
        renderRightNav={RightButton}
        renderLeftNav={LeftButton}
      />
    </div>
  );
};

export default ProductGallery;
