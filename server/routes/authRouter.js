const {
  signupController,
  loginController,
  refreshAccessTokenController,
  deleteMyProfileController,
  updateMyProfileContoller,
} = require("../controllers/authController");
const userRequire = require("../middlewares/requireUser");

const router = require("express").Router();
router.post("/signup", signupController);
router.post("/login", loginController);
// router.post("/refresh", refreshAccessTokenController);
// transforming '/refresh' into GET request as we are not passing the refresh token in the body JSON
router.get("/refresh", refreshAccessTokenController);
router.post("/logout", loginController);
router.post("/deleteprofile", userRequire, deleteMyProfileController);

module.exports = router;
