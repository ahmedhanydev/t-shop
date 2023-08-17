import { Link } from "react-router-dom";

const BrandCard = ({ id, img }) => {
  return (
    <Link
      to={`/products/brand/${id}`}
      className="bg-gray-200 w-48 h-48 rounded-full flex justify-center items-center"
    >
      <img src={img} className="h-20" alt="" />
    </Link>
  );
};

export default BrandCard;
