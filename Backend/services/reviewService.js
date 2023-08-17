const asyncHandler = require("express-async-handler");
const sharp = require("sharp");

const reviewModel = require("../models/reviewModel");
const Factory = require("./handlersFactory");

exports.setProductIdAndUserIdToBody = (req, res, next) => {
  //nested route
  if (!req.body.product) {
    req.body.product = req.params.productId;
  }
  if (!req.body.user) {
    req.body.user = req.user._id;
  }
  next();
};
// @desc get all reviews
// @route GET /api/v1/reviews
// @access public
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) {
    filterObject = { product: req.params.productId };
  }
  req.filterObj = filterObject;
  next();
};
// @desc get all reviews
// @route GET /api/v1/reviews
// @access public
exports.getReviews = Factory.getAll(reviewModel);
// @desc create review
// @route POST /api/v1/reviews
// @access Private/protect/user
exports.createReview = Factory.createOne(reviewModel);
// @desc get specific review by id
// @route GET /api/v1/reviews/:id
// @access Public
exports.getReview = Factory.getOne(reviewModel);
// @desc update specific review
// @route PUT /api/v1/reviews/:id
// @access Private/protect/user

exports.updateReview = Factory.updateOne(reviewModel);
// @desc delete specific review
// @route DELETE /api/v1/reviews/:id
// @access Private/protect/admin
exports.deleteReview = Factory.deleteOne(reviewModel);
