const {
  signupController,
  loginController,
} = require("../controllers/authController");

const router = require("express").Router();
router.post("/signup", signupController);
router.post("/login", loginController);
module.exports = router;
