const {
  signupController,
  loginController,
  refreshAccessTokenController,
} = require("../controllers/authController");

const router = require("express").Router();
router.post("/signup", signupController);
router.post("/login", loginController);
// router.post("/refresh", refreshAccessTokenController);
// transforming '/refresh' into GET request as we are not passing the refresh token in the body JSON
router.get("/refresh", refreshAccessTokenController);
module.exports = router;
