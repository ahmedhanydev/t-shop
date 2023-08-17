const express = require("express");

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  ChangePassword,
  uploadUserImage,
  resizeImage,
  getLoggedUser,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteMe,
  activateMe,
} = require("../services/userService");
const {
  createUserValidator,
  getUserValidator,
  updateUserValidator,
  deleteUserValidator,
  updateUserPasswordValidator,
  updateLoggedUserPassValidator,
  updateLoggedUserValidator,
} = require("../utils/validators/userValidator");

const router = express.Router();
const authService = require("../services/authService");

router.get("/getMe", authService.protect, getLoggedUser, getUser);
router.put(
  "/changeMyPassword",
  authService.protect,
  updateLoggedUserPassValidator,
  updateLoggedUserPassword
);
router.put(
  "/updateMyData",
  authService.protect,
  updateLoggedUserValidator,
  updateLoggedUserData
);
router.put(
  "/deleteMe",
  authService.protect,

  deleteMe
);
router.put(
  "/activateMe",

  activateMe
);

router.put("/changePassword/:id", updateUserPasswordValidator, ChangePassword);
router
  .route("/")
  .get(authService.protect, authService.allowedTo("admin"), getUsers)
  .post(
    authService.protect,
    authService.allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    createUserValidator,
    createUser
  );
router
  .route("/:id")
  .get(
    authService.protect,
    authService.allowedTo("admin"),
    getUserValidator,
    getUser
  )
  .put(
    authService.protect,
    authService.allowedTo("admin"),
    uploadUserImage,
    resizeImage,
    updateUserValidator,
    updateUser
  )
  .delete(
    authService.protect,
    authService.allowedTo("admin"),
    deleteUserValidator,
    deleteUser
  );

module.exports = router;
