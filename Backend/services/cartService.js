const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");
const couponModel = require("../models/couponModel");

const calcTotalCartPrice = async (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalCartPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  cart.coupon = undefined;

  await cart.save();

  return totalPrice;
};
// @desc add product ot cart
// @route POST /api/v1/cart
// @access private/user
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;
  const product = await productModel.findById(productId);

  let cart = await cartModel.findOne({ user: req.user._id });

  if (!cart) {
    cart = await cartModel.create({
      user: req.user._id,
      cartItems: [{ product: productId, color, price: product.price }],
    });
  } else {
    // هf product exist in cart , update product quantity
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product.toString() === productId && item.color === color
    );
    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;

      cart.cartItems[productIndex] = cartItem;
    } else {
      // if product not exist in cart , add to cart items array
      cart.cartItems.push({ product: productId, color, price: product.price });
    }
  }
  await calcTotalCartPrice(cart);

  // await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    message: "product added to cart successfully",
    data: cart,
  });
});

// @desc get logged user cart
// @route GET /api/v1/cart
// @access private/user
exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel
    .findOne({ user: req.user._id })
    .populate({
      path: "cartItems.product",
      select: "title imageCover ratingsAverage brand category ",
      populate: { path: "brand", select: "name -_id", model: "Brand" },
    })
    .populate({
      path: "cartItems.product",
      select: "title imageCover ratingsAverage brand category",
      populate: { path: "category", select: "name -_id", model: "Category" },
    });

  if (!cart) {
    return next(
      new ApiError(`there no cart with this user id ${req.user._id}`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc remove item from cart
// @route DELETE /api/v1/cart/itemId
// @access private/user
exports.removeItemFromCart = asyncHandler(async (req, res, next) => {
  const cart = await cartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItems: { _id: req.params.itemId } } },
    { new: true }
  );

  calcTotalCartPrice(cart);
  await cart.save();

  res.status(200).json({
    status: "remove is success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc clear user cart
// @route DELETE /api/v1/cart
// @access private/user
exports.clearCart = asyncHandler(async (req, res, next) => {
  await cartModel.findOneAndDelete({ user: req.user._id });
  res.status(200).json({
    status: "cart is cleared",
  });
});

// @desc update quantity item
// @route PUT /api/v1/cart/itemId
// @access private/user
exports.updateQuantityItem = asyncHandler(async (req, res, next) => {
  const { quantity } = req.body;
  const cart = await cartModel.findOne({ user: req.user._id });

  if (!cart) {
    return next(
      new ApiError(`there no cart with this user id ${req.user._id}`, 404)
    );
  }

  const itemIndex = cart.cartItems.findIndex(
    (item) => item._id.toString() === req.params.itemId
  );

  if (itemIndex > -1) {
    const cartItem = cart.cartItems[itemIndex];
    cartItem.quantity = quantity;
    cart.cartItems[itemIndex] = cartItem;
  } else {
    return next(
      new ApiError(`there no item with this item id ${req.user._id}`, 404)
    );
  }
  await calcTotalCartPrice(cart);

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});

// @desc apply coupon
// @route PUT /api/v1/cart/applyCoupon
// @access private/user
exports.applyCoupon = asyncHandler(async (req, res, next) => {
  //  Get logged user cart to get total cart price
  const cart = await cartModel.findOne({ user: req.user._id });

  //  Get coupon based on coupon name
  const coupon = await couponModel.findOne({
    name: req.body.coupon,
    expire: { $gt: Date.now() },
  });

  if (!coupon) {
    cart.totalAfterDiscount = undefined;
    cart.coupon = undefined;
    await cart.save();
    return next(new ApiError(`Coupon is invalid or expired`));
  }

  const totalPrice = cart.totalCartPrice;

  //  Calculate price after priceAfterDiscount
  const totalPriceAfterDiscount = (
    totalPrice -
    (totalPrice * coupon.discount) / 100
  ).toFixed(2);

  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  cart.coupon = coupon.name;

  await cart.save();

  res.status(200).json({
    status: "success",
    numOfCartItems: cart.cartItems.length,
    data: cart,
  });
});
