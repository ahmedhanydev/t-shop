const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const bcrypt = require("bcryptjs");

const { v4: uuidv4 } = require("uuid");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

const UserModel = require("../models/userModel");
const Factory = require("./handlersFactory");
const createToken = require("../utils/createToken");
const ApiError = require("../utils/apiError");

exports.uploadUserImage = uploadSingleImage("profileImg");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);
    req.body.profileImg = filename;
  }

  next();
});
// @desc get all users
// @route GET /api/v1/users
// @access private
exports.getUsers = Factory.getAll(UserModel);
// @desc create User
// @route POST /api/v1/users
// @access private
exports.createUser = Factory.createOne(UserModel);
// @desc get specific user by id
// @route GET /api/v1/users/:id
// @access private
exports.getUser = Factory.getOne(UserModel);
// @desc update specific user
// @route PUT /api/v1/users/:id
// @access Private

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { name, slug, email, phone, profileImg, role, active } = req.body;
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      slug,
      email,
      phone,
      profileImg,
      role,
      active,
    },
    {
      new: true,
    }
  );
  if (!document) {
    // res.status(404).json({ message: "this category is not found" });
    return next(new ApiError(`this document is not found`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc update  user password
// @route PUT /api/v1/users/changePassword/:id
// @access Private

exports.ChangePassword = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,

    {
      password: await bcrypt.hash(req.body.password, 7),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!document) {
    // res.status(404).json({ message: "this category is not found" });
    return next(new ApiError(`this document is not found`, 404));
  }
  res.status(200).json({ data: document });
});
// @desc delete specific user
// @route DELETE /api/v1/users/:id
// @access Private
exports.deleteUser = Factory.deleteOne(UserModel);

// @desc get user data
// @route GET /api/v1/users
// @access protect
exports.getLoggedUser = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  console.log(req.params.id);
  next();
});

// @desc update logged user password
// @route PUT /api/v1/users
// @access protect
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,

    {
      password: await bcrypt.hash(req.body.password, 7),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  console.log(user);
  const token = createToken(user._id);
  console.log(user._id, token);
  res.status(201).json({ Data: user, token });
});

// @desc update logged user data
// @route PUT /api/v1/users/updateMyData
// @access protect
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  );

  res.status(200).json({ status: "success", data: updatedUser });
});
// @desc deactivate user
// @route PUT /api/v1/users/deleteMe
// @access protect
exports.deleteMe = asyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user._id, { active: false });

  res.status(200).json({ message: "deactivated successfully" });
});

// @desc activate user
// @route PUT /api/v1/users/activateMe
// @access protect
exports.activateMe = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("not found user"));
  }
  if (user) {
    await UserModel.findByIdAndUpdate(user._id, { active: true });
    res.status(200).json({ message: "activated successfully" });
  }
});
