const userRequire = require("../middlewares/requireUser");
const {
  followerOrUnFollowUsers,
  getPostFollowingUsers,
  getMyInfo,
  updateMyProfileContoller,
} = require("../controllers/followersAndFollowing");

const router = require("express").Router();
router.post("/follow", userRequire, followerOrUnFollowUsers);
// router.get("/getpostsfollowing", userRequire, getPostFollowingUsers);
router.get("/getfeed", userRequire, getPostFollowingUsers);
router.get("/getMyInfo", userRequire, getMyInfo);
router.put("/updatemyprofile", userRequire, updateMyProfileContoller);
//deletemyprofile
//getUserP
// getMyPost

module.exports = router;
