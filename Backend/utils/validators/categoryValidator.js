const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format "),
  validatorMiddleware,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("category name is required ")
    .isLength({ min: 3 })
    .withMessage("category name too short")
    .isLength({ max: 30 })
    .withMessage("category name too long")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("nameAr")
    .notEmpty()
    .withMessage(" اسم الفئة مطلوب")
    .isLength({ min: 3 })
    .withMessage(" اسم الفئة قصير جدا ")
    .isLength({ max: 30 })
    .withMessage("اسم الفئة طويل جدا "),

  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format "),
  check("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleware,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid category id format "),
  validatorMiddleware,
];
