import React from "react";
import UnopDropdown from "unop-react-dropdown";
import sortIcon from "../../assets/icons/filter.svg";
const SearchCountResult = ({ title }) => {
  const handler = () => {};
  return (
    <div className="flex justify-between pt-3 px-10">
      <div className="sub-tile">{title}</div>
      <div className="search-count-text d-flex ">
        <UnopDropdown
          onAppear={handler}
          onDisappearStart={handler}
          trigger={
            <p className="flex font-semibold gap-1 mx-1">
              <img className="" src={sortIcon} alt="" />
              Sort by
            </p>
          }
          delay={0}
          align="CENTER"
          hover
        >
          <div
            className=" rounded-xl p-4 w-44 "
            style={{
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 8px 0 #000",
            }}
          >
            <div className="border-b-2 text-sm p-3 hover:bg-[#272727] hover:text-white">
              best seller
            </div>
            <div className="border-b-2 text-sm p-3 hover:bg-[#272727] hover:text-white">
              The highest rated
            </div>
            <div className="border-b-2 text-sm p-3 hover:bg-[#272727] hover:text-white">
              Price from lowest to highest
            </div>
            <div className="border-b-2 text-sm p-3 hover:bg-[#272727] hover:text-white">
              Price from high to low
            </div>
          </div>
        </UnopDropdown>
      </div>
    </div>
  );
};

export default SearchCountResult;
