const { check } = require("express-validator");
const slugify = require("slugify");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const reviewModel = require("../../models/reviewModel");
const ApiError = require("../apiError");

exports.getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review id format "),
  validatorMiddleware,
];

exports.createReviewValidator = [
  check("title").optional(),
  check("ratings")
    .notEmpty()
    .withMessage("ratings is required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("ratings value must be between 1 and 5"),

  check("user").notEmpty().withMessage("user is required").isMongoId(),
  check("product")
    .notEmpty()
    .withMessage("product is required")
    .isMongoId()
    .custom((val, { req }) =>
      reviewModel
        .findOne({ user: req.user._id, product: req.body.product })
        .then((review) => {
          if (review) {
            return Promise.reject(
              new Error("you already created a new review before")
            );
          }
        })
    ),
  validatorMiddleware,
];

exports.updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format ")
    .custom((val, { req }) =>
      reviewModel.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error(`not found review for this  ${val}`));
        }
        console.log(review.user.toString() !== req.user._id.toString());
        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error(`you are not allowed to perform this action`)
          );
        }
      })
    ),

  validatorMiddleware,
];

exports.deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format ")
    .custom((val, { req }) => {
      if (req.user.role === "user") {
        reviewModel.findById(val).then((review) => {
          if (!review) {
            return Promise.reject(
              new Error(`not found review for this  ${val}`)
            );
          }

          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error(`you are not allowed to perform this action`)
            );
          }
        });
      }
      return true;
    }),
  validatorMiddleware,
];
