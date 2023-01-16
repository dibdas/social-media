const userRequire = require("../middlewares/requireUser");
const {
  followerOrUnFollowUsers,
  getPostFollowingUsers,
  getMyInfo,
} = require("../controllers/followersAndFollowing");

const router = require("express").Router();
router.post("/follow", userRequire, followerOrUnFollowUsers);
router.get("/getpostsfollowing", userRequire, getPostFollowingUsers);
router.get("/getMyInfo", userRequire, getMyInfo);
//deletemyprofile
//getUserP
// getMyPost

module.exports = router;
