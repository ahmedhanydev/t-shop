import Home from "./Pages/Home";
import Navbar from "./Components/Utilits/Navbar";
import Footer from "./Components/Utilits/Footer";
import { Routes, Route } from "react-router-dom";
import Categories from "./Pages/Categories";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import AllCategory from "./Pages/AllCategory";
import AllBrands from "./Pages/AllBrands";
import { useState } from "react";
import ProductPage from "./Pages/ProductPage";
import PaymentMethodPage from "./Pages/PaymentMethodPage";
import AdminPage from "./Pages/Admin/AdminPage";
import AdminAllOrders from "./Pages/Admin/AdminAllOrders";
import AdminAllProducts from "./Pages/Admin/AdminAllProducts";
import AdminOrdersDetails from "./Pages/Admin/AdminOrdersDetails";
import AdminAddBrand from "./Pages/Admin/AdminAddBrand";
import AdminAddCategory from "./Pages/Admin/AdminAddCategory";
import AdminAddSubCategory from "./Pages/Admin/AdminAddSubCategory";
import AdminAddProducts from "./Pages/Admin/AdminAddProducts";
import UserPage from "./Pages/User/UserPage";
import UserAllOrders from "./Pages/User/UserAllOrders";
import UserAddresses from "./Pages/User/UserAddresses";
import UserProfile from "./Pages/User/UserProfile";
import UserAddAddress from "./Pages/User/UserAddAddress";
import UserEditAddress from "./Pages/User/UserEditAddress";
import ErrorPage from "./Pages/ErrorPage";
import UserWishlist from "./Pages/User/UserWishlist";
import AdminEditProduct from "./Pages/Admin/AdminEditProduct";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import VerifyPassword from "./Pages/Auth/VerifyPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import AdminAddCoupon from "./Pages/Admin/AdminAddCoupon";
import AdminEditCoupon from "./Pages/Admin/AdminEditCoupon";
import ProtectedRouteHook from "./hook/auth/protected-route-hook";
import ProtectedRoute from "./Components/Utilits/ProtectedRoute";
import ProductsByCategory from "./Pages/ProductsByCategory";
import ProductsByBrand from "./Pages/ProductsByBrand";

function App() {
  const [user, isUser, isAdmin] = ProtectedRouteHook();
  // console.log(user);
  // console.log(isUser);
  // console.log(isAdmin);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/allcategory" element={<AllCategory />} />
        <Route path="/allbrands" element={<AllBrands />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/products/category/:id" element={<ProductsByCategory />} />
        <Route path="/products/brand/:id" element={<ProductsByBrand />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-password" element={<VerifyPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute auth={isAdmin} />}>
          <Route path="/admin" element={<AdminPage />}>
            <Route path="/admin/allorders" element={<AdminAllOrders />} />
            <Route path="/admin/allproducts" element={<AdminAllProducts />} />
            <Route path="/admin/orders/:id" element={<AdminOrdersDetails />} />
            <Route path="/admin/addbrand" element={<AdminAddBrand />} />
            <Route path="/admin/addcategory" element={<AdminAddCategory />} />
            <Route
              path="/admin/addsubcategory"
              element={<AdminAddSubCategory />}
            />
            <Route path="/admin/addproducts" element={<AdminAddProducts />} />
            <Route
              path="/admin/editproduct/:id"
              element={<AdminEditProduct />}
            />
            <Route path="/admin/addcoupon" element={<AdminAddCoupon />} />
            <Route path="/admin/editcoupon/:id" element={<AdminEditCoupon />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute auth={isUser} />}>
          <Route path="/orders/paymentmethod" element={<PaymentMethodPage />} />

          <Route path="/user" element={<UserPage />}>
            <Route path="/user/allorders" element={<UserAllOrders />} />
            <Route path="/user/addresses" element={<UserAddresses />} />
            <Route path="/user/add-address" element={<UserAddAddress />} />
            <Route
              path="/user/edit-address/:id"
              element={<UserEditAddress />}
            />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/wishlist" element={<UserWishlist />} />
          </Route>
        </Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
