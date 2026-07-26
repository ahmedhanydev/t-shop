const express = require("express");

const {
  getCoupons,
  createCoupon,
  getCoupon,
  updateCoupon,
  deleteCoupon,
} = require("../services/couponService");

// const {
//   createCouponValidator,
//   getCouponValidator,
//   updateCouponValidator,
//   deleteCouponValidator,
// } = require("../utils/validators/couponValidator");

const authService = require("../services/authService");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("manager", "admin"));

router.route("/").get(getCoupons).post(
  // createCouponValidator,
  createCoupon
);
router
  .route("/:id")
  .get(
    // getCouponValidator,

    getCoupon
  )
  .put(
    // updateCouponValidator,
    updateCoupon
  )
  .delete(
    // deleteCouponValidator,
    deleteCoupon
  );
module.exports = router;
