const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const CategoryModel = require("../models/categoryModel");
const Factory = require("./handlersFactory");
const ApiError = require("../utils/apiError");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const { cloudinaryUploadImage } = require("../utils/cloudinary");

//  * Disk Storage engine
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/categories");
//   },
//   filename: function (req, file, cb) {
//     const extension = file.mimetype.split("/")[1];
//     const filename = `category-${uuidv4()}-${Date.now()}.${extension}`;
//     cb(null, filename);
//   },
// });
//  * Memory Storage engine
// const multerStorage = multer.memoryStorage();

// const multerFilter = function (req, file, cb) {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new ApiError("only images allowed", 400), false);
//   }
// };

// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  // console.log(req.file);
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/categories/${filename}`);

    req.body.image = filename;
  }

  next();
});
exports.uploadCategoryImage = uploadSingleImage("image");

// @desc get all categories
// @route GET /api/v1/categories
// @access public
exports.getCategories = Factory.getAll(CategoryModel);
// @desc create category
// @route POST /api/v1/categories
// @access private
exports.createCategory = asyncHandler(async (req, res) => {
  // console.log(req.body);

  const imagePath = path.join(__dirname, `../uploads/${req.file.filename}`);

  const result = await cloudinaryUploadImage(imagePath);
  console.log("result", result);
  // console.log("create is here");
  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }
  const { name, nameAr } = req.body;
  const document = await CategoryModel.create({
    name,
    nameAr,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
  });
  res.status(201).json({ status: 201, data: document });
  fs.unlinkSync(imagePath);
});
// @desc get specific category by id
// @route GET /api/v1/categories/:id
// @access Public
exports.getCategory = Factory.getOne(CategoryModel);
// @desc update specific category
// @route PUT /api/v1/categories/:id
// @access Private

exports.updateCategory = Factory.updateOne(CategoryModel);
// @desc delete specific category
// @route DELETE /api/v1/categories/:id
// @access Private
exports.deleteCategory = Factory.deleteOne(CategoryModel);
