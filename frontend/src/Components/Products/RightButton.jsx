import React from "react";
import prev from "../../assets/icons/prev.png";
const RightButton = (onClick, onDisable) => {
  return (
    <img
      src={prev}
      alt=""
      width="35px"
      onClick={onClick}
      onDisable={onDisable}
      height="35px"
      style={{ float: "right", marginTop: "180px", cursor: "pointer" }}
    />
  );
};

export default RightButton;
