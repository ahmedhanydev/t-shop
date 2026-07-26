import HomeBrandHook from "../../hook/brand/home-brand-hook";
import BrandCard from "../Brands/BrandCard";
import SubTitle from "./../Utilits/SubTitle";

const HomeBrands = () => {
  const [items, loading] = HomeBrandHook();

  return (
    <>
      <>
        <div className="container mx-auto my-20">
          <SubTitle
            title="Brands"
            btnTitle="Browse all brands →"
            path="/allbrands"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 place-content-center place-items-center gap-y-8">
            {loading === false ? (
              items.length > 0 ? (
                items.map((brand, index) => {
                  return (
                    <BrandCard
                      id={brand._id}
                      key={index}
                      img={brand.image.url}
                    />
                  );
                })
              ) : (
                <h2>brands is empty</h2>
              )
            ) : (
              <div className="flex justify-center  items-center text-center w-96   ">
                <i
                  className="pi pi-spin pi-spinner"
                  style={{ fontSize: "2.5rem" }}
                ></i>
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default HomeBrands;
