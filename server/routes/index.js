const router = require("express").Router();
const authRouter = require("./authRouter");
router.use("/auth", authRouter);
module.exports = router;
