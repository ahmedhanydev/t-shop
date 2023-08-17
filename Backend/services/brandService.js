const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

const BrandModel = require("../models/brandModel");
const Factory = require("./handlersFactory");
const { cloudinaryUploadImage } = require("../utils/cloudinary");

exports.uploadBrandImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);
  req.body.image = filename;
  console.log(req.body);
  next();
});
// @desc get all brands
// @route GET /api/v1/brands
// @access public
exports.getBrands = Factory.getAll(BrandModel);
// @desc create Brand
// @route POST /api/v1/brands
// @access private
exports.createBrand = asyncHandler(async (req, res) => {
  // console.log(req.body);

  const imagePath = path.join(__dirname, `../uploads/${req.file.filename}`);

  const result = await cloudinaryUploadImage(imagePath);

  // console.log("create is here");
  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }
  const { name, nameAr } = req.body;
  const document = await BrandModel.create({
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
// @desc get specific Brand by id
// @route GET /api/v1/brands/:id
// @access Public
exports.getBrand = Factory.getOne(BrandModel);
// @desc update specific Brand
// @route PUT /api/v1/brands/:id
// @access Private

exports.updateBrand = Factory.updateOne(BrandModel);
// @desc delete specific Brand
// @route DELETE /api/v1/brands/:id
// @access Private
exports.deleteBrand = Factory.deleteOne(BrandModel);
