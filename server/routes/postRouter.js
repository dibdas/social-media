const { getAllPostsController } = require("../controllers/postsController");
const userRequire = require("../middlewares/requireUser");

const router = require("express").Router();
// when userRequire hit next function or call the next function, then getAllPostsController will be called
router.get("/all", userRequire, getAllPostsController);
module.exports = router;
