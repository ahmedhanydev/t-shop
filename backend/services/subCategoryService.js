const subCategoryModel = require("../models/subCategoryModel");
const Factory = require("./handlersFactory");
// @desc get all subcategories
// @route GET /api/v1/subcategories
// @access public
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }
  req.filterObj = filterObject;
  next();
};

exports.getSubCategories = Factory.getAll(subCategoryModel);

exports.setCategoryIdToBody = (req, res, next) => {
  //nested route
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};
// @desc create subcategory
// @route POST /api/v1/subcategories
// @access private
exports.createSubCategory = Factory.createOne(subCategoryModel);
// @desc get specific subcategory by id
// @route GET /api/v1/subcategories/:id
// @access Public
exports.getSubCategory = Factory.getOne(subCategoryModel);
// @desc update specific subcategory
// @route PUT /api/v1/subcategories/:id
// @access Private
// exports.applySlugify = (req, res, next) => {
//   req.body.slug = slugify(req.body.name || req.body.nameAr);
//   next();
// };
exports.updateSubCategory = Factory.updateOne(subCategoryModel);
// @desc delete specific subCategory
// @route DELETE /api/v1/subcategories/:id
// @access Private
exports.deleteSubCategory = Factory.deleteOne(subCategoryModel);
