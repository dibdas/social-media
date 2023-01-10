const userRequire = require("../middlewares/requireUser");
const {
  followerOrUnFollowUsers,
  getPostFollowingUsers,
} = require("../controllers/followersAndFollowing");

const router = require("express").Router();
router.post("/follow", userRequire, followerOrUnFollowUsers);
router.get("/getpostsfollowing", userRequire, getPostFollowingUsers);

module.exports = router;
