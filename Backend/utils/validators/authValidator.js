const { check, body } = require("express-validator");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const UserModel = require("../../models/userModel");

exports.signupValidator = [
  check("name")
    .notEmpty()
    .withMessage("User name is required ")
    .isLength({ min: 3 })
    .withMessage("User name too short")
    .isLength({ max: 30 })
    .withMessage("User name too long")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);

      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom((val) =>
      UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("this email  already in use"));
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("the password confirm incorrect ");
      }
      return true;
    }),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("password confirmation is required"),
  check("role").optional(),
  validatorMiddleware,
];
exports.loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  validatorMiddleware,
];
