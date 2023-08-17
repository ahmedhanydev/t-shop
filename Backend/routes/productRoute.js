const express = require("express");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImage,
} = require("../services/productService");
const {
  getProductValidator,
  updateProductValidator,
  createProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");
const reviewRoute = require("./reviewRoute");

const router = express.Router();
const authService = require("../services/authService");

router.use("/:productId/reviews", reviewRoute);
router.route("/").get(getProducts).post(
  authService.protect,
  authService.allowedTo("manager", "admin"),
  uploadProductImages,
  // resizeProductImage,
  createProductValidator,
  createProduct
);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(
    authService.protect,
    authService.allowedTo("manager", "admin"),
    uploadProductImages,
    // resizeProductImage,
    updateProductValidator,
    updateProduct
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteProductValidator,
    deleteProduct
  );
module.exports = router;
