const express = require("express");

const authService = require("../services/authService");
const {
  addAddress,
  getLoggedUserAddresses,
  removeAddress,
  getAddress,
  updateAddress,
} = require("../services/addressService");

const router = express.Router();

router.use(authService.protect, authService.allowedTo("user"));

router.route("/").post(addAddress).get(getLoggedUserAddresses);

router
  .route("/:addressId")
  .delete(removeAddress)
  .get(getAddress)
  .put(updateAddress);

module.exports = router;
