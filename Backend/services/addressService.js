const asyncHandler = require("express-async-handler");

const UserModel = require("../models/userModel");

// @desc add address to user addresses list
// @route POST /api/v1/addresses
// @access protect/user
exports.addAddress = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "address add success  ",
    data: user.addresses,
  });
});

// @desc remove address from user addresses list
// @route DELETE /api/v1/addresses
// @access protect/user
exports.removeAddress = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.params.addressId } },
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "removed address is success ",
    data: user.addresses,
  });
});

// @desc get logged user addresses
// @route GET /api/v1/addresses
// @access protect/user
exports.getLoggedUserAddresses = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).populate("addresses");

  res.status(200).json({
    status: "success",
    results: user.addresses.length,
    data: user.addresses,
  });
});

// @desc      update address from addresses list
// @route     PUT /api/v1/addresses/:addressId
// @access    Private/User
exports.updateAddress = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);

  const address = user.addresses.id(req.params.addressId);

  address.alias = req.body.alias || address.alias;
  address.details = req.body.details || address.details;
  address.phone = req.body.phone || address.phone;
  address.city = req.body.city || address.city;
  address.postalCode = req.body.postalCode || address.postalCode;

  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Address updated successfully",
    data: address,
  });
});

// @desc      Get Specific address from addresses list
// @route     Get /api/v1/addresses/:addressId
// @access    Private/User
exports.getAddress = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id);

  const address = user.addresses.id(req.params.addressId);

  return res.status(200).json({
    status: "success",
    data: address,
  });
});
