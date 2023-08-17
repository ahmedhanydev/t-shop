import React from "react";
import AdminAllProductsCard from "../../Components/Admin/AdminAllProductsCard";
import Pagination from "../../Components/Utilits/Pagination";
import ViewProductsAdminHook from "../../hook/admin/view-products-admin-hook";

const AdminAllProducts = () => {
  const [productsList, pageCount, getPage] = ViewProductsAdminHook();
  if (pageCount) {
    console.log(pageCount);
    console.log(getPage);
  }
  return (
    <div className="container mx-auto ">
      <div className="pl-5 mb-5">
        <h1 className="font-bold text-lg lg:text-xl">Products Management</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3  mx-5">
        {productsList ? (
          productsList.map((product, index) => {
            return <AdminAllProductsCard item={product} key={index} />;
          })
        ) : (
          <p>not there products</p>
        )}
      </div>
      {pageCount > 1 ? (
        <Pagination pageCount={pageCount} onPress={getPage} />
      ) : null}
    </div>
  );
};

export default AdminAllProducts;
