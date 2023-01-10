const userRequire = require("../middlewares/requireUser");
const {
  followerOrUnFollowUsers,
} = require("../controllers/followersAndFollowing");
const router = require("express").Router();
router.post("/follow", userRequire, followerOrUnFollowUsers);
module.exports = router;
