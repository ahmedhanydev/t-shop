const { check } = require("express-validator");
const slugify = require("slugify");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format "),
  validatorMiddleware,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand name is required ")
    .isLength({ min: 3 })
    .withMessage("Brand name too short")
    .isLength({ max: 30 })
    .withMessage("Brand name too long")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);

      return true;
    }),
  check("nameAr")
    .notEmpty()
    .withMessage(" اسم الماركة مطلوب")
    .isLength({ min: 3 })
    .withMessage(" اسم الماركة قصير جدا ")
    .isLength({ max: 30 })
    .withMessage("اسم الماركة طويل جدا "),

  validatorMiddleware,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format "),
  check("name").optional().custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleware,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand id format "),
  validatorMiddleware,
];
