const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const UserModel = require("../models/userModel");

// @desc add product to wishlist
// @route POST /api/v1/wishlist
// @access protect/user
exports.addProductToWishlist = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: req.body.productId },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "product add success to wishlist ",
    data: user.wishlist,
  });
});

// @desc remove product from wishlist
// @route DELETE /api/v1/wishlist
// @access protect/user
exports.removeProductFromWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: productId },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "removed product from wishlist is success ",
    data: user.wishlist,
  });
});

// @desc get logged user wishlist
// @route GET /api/v1/wishlist
// @access protect/user
exports.getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).populate("wishlist");

  res.status(200).json({
    status: "success",
    results: user.wishlist.length,
    data: user.wishlist,
  });
});
