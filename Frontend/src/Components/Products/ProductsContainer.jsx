import ProductsContainerHook from "../../hook/product/products-container-hook";
import SubTitle from "./../Utilits/SubTitle";
import ProductCard from "./ProductCard";

const ProductsContainer = ({ title, btnTitle, path, girdValue, products }) => {
  const [favList] = ProductsContainerHook();
  return (
    <div
      className={
        girdValue === 3 ? "container mx-auto " : "container mx-auto my-32"
      }
    >
      {products ? (
        <SubTitle title={title} btnTitle={btnTitle} path={path} />
      ) : null}

      <div
        className={
          girdValue === 3
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-content-center place-items-center gap-y-8"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center place-items-center gap-y-8"
        }
      >
        {products
          ? products.map((item, index) => {
              return (
                <ProductCard
                  key={index}
                  name={item.title}
                  price={item.price}
                  img={item.imageCover.url}
                  rating={item.ratingsAverage}
                  priceAfterDiscount={item.priceAfterDiscount}
                  id={item._id}
                  ratingsQuantity={item.ratingsQuantity}
                  favList={favList}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ProductsContainer;
