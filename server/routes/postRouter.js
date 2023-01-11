const {
  likeandUnlikePostController,
} = require("../controllers/likesAndUnlike");
const {
  getAllPostsController,
  createPostController,
  updatePostController,
  deletePostcontroller,
  getMyPosts,
  getUserPostController,
} = require("../controllers/postsController");
const userRequire = require("../middlewares/requireUser");

const router = require("express").Router();
// when userRequire hit next function or call the next function, then getAllPostsController will be called
router.get("/all", userRequire, getAllPostsController);
router.post("/new", userRequire, createPostController);
router.post("/like", userRequire, likeandUnlikePostController);
router.put("/update", userRequire, updatePostController);
router.delete("/delete", userRequire, deletePostcontroller);
router.get("/mine", userRequire, getMyPosts);
router.get("/user", userRequire, getUserPostController);
module.exports = router;
