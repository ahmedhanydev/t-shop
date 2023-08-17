const { createHmac } = require("crypto");

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ApiError = require("../utils/apiError");
const createToken = require("../utils/createToken");
const UserModel = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");

// @desc signup
// @route POST /api/v1/auth/signup
// @access Public
exports.signup = asyncHandler(async (req, res, next) => {
  // create user

  const user = await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });
  //  generate token
  const token = createToken(user._id);
  res.status(201).json({ data: user, token });
});
// @desc login
// @route POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  // create user

  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("incorrect email or password", 401));
  }
  //  generate token

  const token = createToken(user._id);
  console.log(token);
  res.status(201).json({ data: user, token });
});

exports.protect = asyncHandler(async (req, res, next) => {
  // check token exist and if exist get it
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("you are not logged in please login first"));
  }
  // verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // check if user exist
  const currentUser = await UserModel.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "the user that belong to this token does no longer exist ",
        401
      )
    );
  }

  if (!currentUser.active) {
    return next(
      new ApiError("your account is not active please active your account")
    );
  }
  // if password changed

  if (currentUser.passwordChangedAt) {
    const passwordChangedTimeStamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passwordChangedTimeStamp > decoded.iat) {
      return next(
        new ApiError("User recently changed password please login again", 401)
      );
    }
  }

  req.user = currentUser;
  next();
});
// @desc authentication (user permissions)
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    // access roles
    // access register user (user.role)
    if (!roles.includes(req.user.role)) {
      return next(new ApiError("you not allowed to this route", 403));
    }
    next();
  });

// @desc forgot password
// @route POST /api/v1/auth/forgotPassword
// @access Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // get user by email

  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ApiError(`there is no user with email ${req.body.email}`, 404)
    );
  }

  // generate code form 6 digits

  const restCode = Math.floor(100000 + Math.random() * 900000).toString();

  const secret = "abcdefg";
  const hashResetCode = createHmac("sha256", secret)
    .update(restCode)
    .digest("hex");

  user.passwordResetCode = hashResetCode;
  // expires code after 10 minutes
  user.passwordResetExpiresAt = Date.now() + 10 * 60 * 1000;

  user.passwordCodeVerified = false;

  await user.save();

  //send email
  const message = `Hi ${user.name} \nwe received a request to reset your password on your T-shop account. \n ${restCode} \nEnter this code to complete the reset.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password rest code valid for (10 minutes)",
      message,
    });
  } catch (err) {
    user.passwordResetCode = undefined;
    user.passwordResetExpiresAt = undefined;
    user.passwordCodeVerified = undefined;
    await user.save();
    return next(new ApiError("there was an error in sending email", 500));
  }

  res
    .status(200)
    .json({ status: "Success", message: "Reset code sent to email" });
});
// @desc verify reset code
// @route POST /api/v1/auth/verifyResetCode
// @access Public

exports.verifyPassResetCode = asyncHandler(async (req, res, next) => {
  // get user based on reset code
  const secret = "abcdefg";
  const hashResetCode = createHmac("sha256", secret)
    .update(req.body.resetCode)
    .digest("hex");

  const user = await UserModel.findOne({
    passwordResetCode: hashResetCode,
    passwordResetExpiresAt: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError("reset code is invalid or expired"));
  }

  user.passwordCodeVerified = true;

  await user.save();

  res.status(200).json({ status: "verify is success" });
});

// @desc reset password
// @route POST /api/v1/auth/resetPassword
// @access Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // get user based on email
  const user = await UserModel.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new ApiError(`there no user with email ${req.body.email}`, 404)
    );
  }

  if (!user.passwordCodeVerified) {
    return next(new ApiError(`reset code not verified`, 400));
  }

  user.password = req.body.newPassword;
  user.passwordResetCode = undefined;
  user.passwordResetExpiresAt = undefined;
  user.passwordCodeVerified = undefined;

  await user.save();

  const token = createToken(user._id);

  res.status(200).json({ status: "success", token });
});
