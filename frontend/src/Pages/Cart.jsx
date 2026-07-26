import { ToastContainer } from "react-toastify";
import CartCheckout from "../Components/Cart/CartCheckout";
import CartItem from "../Components/Cart/CartItem";
import ClearUserCartHook from "../hook/cart/clear-user-cart-hook";
import GetAllUserCart from "../hook/cart/get-all-user-cart-hook";

const Cart = () => {
  const [
    cartNum,
    cartItems,
    totalPrice,
    couponNameValue,
    totalPriceAfterDiscount,
    cartID,
  ] = GetAllUserCart();

  const [deleteCartHandel] = ClearUserCartHook();
  return (
    <div className="container  mx-auto ">
      {cartItems.length >= 1 ? (
        cartItems.map((item, index) => {
          return <CartItem item={item} key={index} />;
        })
      ) : (
        <div className="flex justify-center mt-5">
          <p className="font-bold text-lg">There no product in your cart yet</p>
        </div>
      )}
      <div className="flex  mt-10 justify-center">
        <button
          onClick={deleteCartHandel}
          className=" py-2 px-7 rounded-lg border-2 font-bold text-lg border-gray-800 text-gray-800 hover:border-red-500 hover:bg-red-500 hover:text-white"
        >
          Clear Cart
        </button>
      </div>
      <CartCheckout
        cartItems={cartItems}
        totalPrice={totalPrice}
        couponNameValue={couponNameValue}
        totalPriceAfterDiscount={totalPriceAfterDiscount}
      />
      <ToastContainer />
    </div>
  );
};

export default Cart;
