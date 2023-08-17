const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const fs = require("fs");
const { default: slugify } = require("slugify");
const pathPackage = require("path");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

const ApiError = require("../utils/apiError");
const productModel = require("../models/productModel");
const Factory = require("./handlersFactory");
const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");

exports.uploadProductImages = uploadMixOfImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);
exports.resizeProductImage = asyncHandler(async (req, res, next) => {
  // image cover processing
  console.log("resize in here");
  if (req.files && req.files.imageCover) {
    const imageCoverName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverName}`);
    req.body.imageCover = imageCoverName;
  }
  // images processing
  if (req.files && req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        req.body.images.push(imageName);
      })
    );
  }
  next();
});

// @desc get all products
// @route GET /api/v1/products
// @access public
exports.getProducts = Factory.getAll(productModel, "Products");
// @desc create products
// @route POST /api/v1/products
// @access private
exports.createProduct = asyncHandler(async (req, res) => {
  // console.log(req.body);

  // const imagePath = path.join(__dirname, `../uploads/${req.file.filename}`);

  // if (req.file) {
  //   console.log("file", req.file);
  // }
  let imagePath = "";
  if (req.files.imageCover[0]) {
    imagePath = pathPackage.join(
      __dirname,
      `../uploads/${req.files.imageCover[0].filename}`
    );
  }
  const resultImageCover = await cloudinaryUploadImage(imagePath);
  fs.unlinkSync(imagePath);

  const imageCover = {
    public_id: "",
    url: "",
  };
  imageCover.public_id = resultImageCover.public_id;
  imageCover.url = resultImageCover.secure_url;

  const urls = [];
  if (req.files.images.length > 0) {
    const { images } = req.files;

    // Map the array of images to an array of promises
    const uploadPromises = images.map(async (image) => {
      const { path } = image;
      const newPath = await cloudinaryUploadImage(path);
      fs.unlinkSync(path);
      return newPath;
    });

    // Wait for all the promises to resolve using Promise.all
    const uploadedImages = await Promise.all(uploadPromises);

    // Add the uploaded image URLs to the 'urls' array
    urls.push(...uploadedImages);
  }
  // console.log(urls);
  let images = [];
  if (urls.length > 0) {
    images = urls.map((img) => ({
      public_id: img.public_id,
      url: img.secure_url,
    }));
  }

  console.log(images);
  // const result = await cloudinaryUploadImage(imagePath);
  // console.log("result", result);
  // console.log("create is here");
  // if (!req.file) {
  //   return res.status(400).json({ message: "no file provided" });
  // }
  const {
    title,
    titleAr,
    description,
    descriptionAr,
    quantity,
    sold,
    price,
    priceAfterDiscount,
    colors,
    category,
    subcategories,
    brand,
    ratingsAverage,
    ratingsQuantity,
  } = req.body;

  const slug = slugify(title);
  const product = await productModel.create({
    title,
    titleAr,
    description,
    descriptionAr,
    quantity,
    sold,
    price,
    priceAfterDiscount,
    colors,
    imageCover,
    images,
    category,
    subcategories,
    brand,
    slug,
    ratingsAverage,
    ratingsQuantity,
  });
  res.status(201).json({ status: 201, data: product });

  // fs.unlinkSync(imagePath);
});
// @desc get specific product by id
// @route GET /api/v1/products/:id
// @access Public
exports.getProduct = Factory.getOne(productModel, "reviews");
// @desc update specific product
// @route PUT /api/v1/products/:id
// @access Private

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const {
    title,
    titleAr,
    description,
    descriptionAr,
    quantity,
    sold,
    price,
    priceAfterDiscount,
    colors,
    category,
    subcategories,
    brand,
    ratingsAverage,
    ratingsQuantity,
  } = req.body;

  let imagePath = "";
  if (req.files.imageCover[0]) {
    imagePath = pathPackage.join(
      __dirname,
      `../uploads/${req.files.imageCover[0].filename}`
    );
  }
  const resultImageCover = await cloudinaryUploadImage(imagePath);
  fs.unlinkSync(imagePath);

  const imageCover = {
    public_id: "",
    url: "",
  };
  imageCover.public_id = resultImageCover.public_id;
  imageCover.url = resultImageCover.secure_url;

  const urls = [];
  if (req.files.images.length > 0) {
    const { images } = req.files;

    // Map the array of images to an array of promises
    const uploadPromises = images.map(async (image) => {
      const { path } = image;
      const newPath = await cloudinaryUploadImage(path);
      fs.unlinkSync(path);
      return newPath;
    });

    // Wait for all the promises to resolve using Promise.all
    const uploadedImages = await Promise.all(uploadPromises);

    // Add the uploaded image URLs to the 'urls' array
    urls.push(...uploadedImages);
  }
  // console.log(urls);
  let images = [];
  if (urls.length > 0) {
    images = urls.map((img) => ({
      public_id: img.public_id,
      url: img.secure_url,
    }));
  }

  const slug = slugify(title);

  console.log(images);

  const product = await productModel.findByIdAndUpdate(
    req.params.id,
    {
      title,
      titleAr,
      description,
      descriptionAr,
      quantity,
      sold,
      price,
      priceAfterDiscount,
      colors,
      imageCover,
      images,
      category,
      subcategories,
      brand,
      slug,
      ratingsAverage,
      ratingsQuantity,
    },
    {
      new: true,
    }
  );

  if (product.imageCover.public_id === imageCover.public_id) {
    await cloudinaryRemoveImage(product.imageCover.public_id);
  }

  if (!product) {
    // res.status(404).json({ message: "this category is not found" });
    return next(new ApiError(`this product is not found`, 404));
  }

  product.save();
  res.status(200).json({ data: product });
});
// @desc delete specific product
// @route DELETE /api/v1/products/:id
// @access Private
exports.deleteProduct = Factory.deleteOne(productModel);
