const { check, body } = require("express-validator");
const slugify = require("slugify");
const bcrypt = require("bcryptjs");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const UserModel = require("../../models/userModel");

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format "),
  validatorMiddleware,
];

exports.createUserValidator = [
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
  check("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("in-valid phone number"),
  check("profileImg").optional(),
  check("role").optional(),
  validatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format "),
  check("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom((val) =>
      UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("this email  already in use"));
        }
      })
    ),
  check("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("in-valid phone number"),
  check("profileImg").optional(),
  check("role").optional(),
  validatorMiddleware,
];
exports.updateLoggedUserValidator = [
  check("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom((val) =>
      UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("this email  already in use"));
        }
      })
    ),
  check("phone")
    .optional()
    .isMobilePhone("any")
    .withMessage("in-valid phone number"),

  validatorMiddleware,
];
exports.updateLoggedUserPassValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("current password must be not empty"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("password confirm must be not empty"),
  body("password")
    .notEmpty()
    .withMessage("new password must be not empty")
    .custom(async (val, { req }) => {
      const user = await UserModel.findById(req.user._id);
      // console.log(user);
      if (!user) {
        throw new Error("invalid user id format");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );

      if (!isCorrectPassword) {
        throw new Error("incorrect password ");
      }

      if (val !== req.body.passwordConfirm) {
        throw new Error("the password confirm incorrect ");
      }
      return true;
    }),
  validatorMiddleware,
];
exports.updateUserPasswordValidator = [
  check("id").isMongoId().withMessage("Invalid User id format "),

  body("currentPassword")
    .notEmpty()
    .withMessage("current password must be not empty"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("password confirm must be not empty"),
  body("password")
    .notEmpty()
    .withMessage("new password must be not empty")
    .custom(async (val, { req }) => {
      const user = await UserModel.findById(req.params.id);
      // console.log(user);
      if (!user) {
        throw new Error("invalid user id format");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );

      if (!isCorrectPassword) {
        throw new Error("incorrect password ");
      }

      if (val !== req.body.passwordConfirm) {
        throw new Error("the password confirm incorrect ");
      }
      return true;
    }),
  validatorMiddleware,
];
exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format "),
  validatorMiddleware,
];
