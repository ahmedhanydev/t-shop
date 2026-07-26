import React from "react";
import AdminAllProductsCard from "../../Components/Admin/AdminAllProductsCard";
import Pagination from "../../Components/Utilits/Pagination";
import CartItem from "./../../Components/Cart/CartItem";
import AdminAllOrdersItem from "../../Components/Admin/AdminAllOrdersItem";
import UserAllOrdersItem from "../../Components/User/UserAllOrdersItem";
import ViewAllOrdersHook from "../../hook/user/view-all-orders-hook";

const UserAllOrders = () => {
  const [results, orders, paginate, onPress] = ViewAllOrdersHook();
  // console.log(paginate);
  return (
    <div className="container mx-auto ">
      <div className="pl-5 mb-5">
        <h1 className="font-bold text-lg lg:text-xl">
          Orders Count : {results}{" "}
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-3  mx-5">
        {orders.length >= 1 ? (
          orders.map((orderItem, index) => {
            return (
              <UserAllOrdersItem
                numberOrder={index + 1}
                key={index}
                orderItem={orderItem}
              />
            );
          })
        ) : (
          <div className="flex justify-center">
            <p>there no orders yet</p>
          </div>
        )}
      </div>
      {paginate.numberOfPages >= 2 ? (
        <Pagination
          pageCount={paginate.numberOfPages ? paginate.numberOfPages : 0}
          onPress={onPress}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default UserAllOrders;
