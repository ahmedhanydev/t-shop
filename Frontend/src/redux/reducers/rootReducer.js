import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import brandReducer from "./brandReducer";
import subcategoryReducer from "./subcategoryReducer";
import productReducer from "./productReducer";
import authReducer from "./authReducer";
import reviewReducer from "./reviewReducer";
import wishlistReducer from "./wishlistReducer";
import { addCoupon } from "../actions/couponAction";
import couponReducer from "./couponReducer";
import addressReducer from "./addressReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import orderReducer from "./orderReducer";
const rootReducer = combineReducers({
  allCategory: categoryReducer,
  allBrand: brandReducer,
  subcategory: subcategoryReducer,
  products: productReducer,
  authReducer: authReducer,
  reviewReducer: reviewReducer,
  wishlistReducer: wishlistReducer,
  couponReducer: couponReducer,
  addressReducer: addressReducer,
  userReducer: userReducer,
  cartReducer: cartReducer,
  checkoutReducer: checkoutReducer,
  orderReducer: orderReducer,
});

export default rootReducer;
