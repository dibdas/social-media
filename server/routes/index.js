const router = require("express").Router();
const authRouter = require("./authRouter");
const postRouter = require("./postRouter");
const followOrUnfollowRouter = require("./followerRouter");

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/user", followOrUnfollowRouter);
router.use("/posts", followOrUnfollowRouter);
router.use("/post", postRouter);
router.use("/auth", authRouter);
module.exports = router;
