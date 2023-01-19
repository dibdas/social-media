const userRequire = require("../middlewares/requireUser");

const { getUserProfileController } = require("../controllers/userController");

const router = require("express").Router();
router.post("/profile", userRequire, getUserProfileController);
module.exports = router;
