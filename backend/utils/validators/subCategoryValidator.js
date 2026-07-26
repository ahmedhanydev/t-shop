const { check, body } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id format "),
  validatorMiddleware,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory name is required ")
    .isLength({ min: 2 })
    .withMessage("subCategory name too short")
    .isLength({ max: 32 })
    .withMessage("subCategory name too long").custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),


  check("nameAr")
    .notEmpty()
    .withMessage(" اسم التصنيف الفرعي ملطوب")
    .isLength({ min: 2 })
    .withMessage(" اسم التصنيف الفرعي قصير جدا ")
    .isLength({ max: 32 })
    .withMessage("اسم التصنيف الفرعي طويل جدا "),
  check("category")
    .notEmpty()
    .withMessage("subCategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid category id format"),
 
  validatorMiddleware,
];

exports.updateSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("subCategory id must be not empty")
    .isMongoId()
    .withMessage("Invalid subCategory id format "),

  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteSubCategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("subCategory id must be not empty")
    .isMongoId()
    .withMessage("Invalid Subcategory id format "),
  validatorMiddleware,
];
