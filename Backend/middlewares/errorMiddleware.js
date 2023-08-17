const ApiError = require("../utils/apiError");

const handlerTokenSignature = () =>
  new ApiError("invalid token please login again ", 401);

const handlerTokenExpired = () =>
  new ApiError("expired token please login again ", 401);

const sendErrorForDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });

const sendErrorForProd = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") {
      err = handlerTokenSignature();
    }
    if (err.name === "TokenExpiredError") {
      err = handlerTokenExpired();
    }
    sendErrorForProd(err, res);
  }
};
module.exports = globalError;
