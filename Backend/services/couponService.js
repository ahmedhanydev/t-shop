const couponModel = require("../models/couponModel");
const Factory = require("./handlersFactory");

// @desc get all coupons
// @route GET /api/v1/coupons
// @access private/admin,manager
exports.getCoupons = Factory.getAll(couponModel);
// @desc create coupon
// @route POST /api/v1/coupons
// @access private/admin,manager
exports.createCoupon = Factory.createOne(couponModel);
// @desc get specific coupon by id
// @route GET /api/v1/coupons/:id
// @access private/admin,manager
exports.getCoupon = Factory.getOne(couponModel);
// @desc update specific coupon
// @route PUT /api/v1/coupons/:id
// @access private/admin,manager
exports.updateCoupon = Factory.updateOne(couponModel);
// @desc delete specific coupon
// @route DELETE /api/v1/coupons/:id
// @access private/admin,manager
exports.deleteCoupon = Factory.deleteOne(couponModel);
