const {
  signController,
  loginController,
} = require("../controllers/authController");

const router = require("express").Router();
router.post("/signup", signController);
router.post("/login", loginController);
module.exports = router;
