const { error, success } = require("../utils/responseWrapper");
const Posts = require("../models/Post");
const Users = require("../models/User");

const getAllPostsController = async (req, res) => {
  console.log(req._id);
  // return res.json({ text: `these are all the routes` });
  return res.send(success(200, { message: `these are all the routes` }));
};

const createPostController = async (req, res) => {
  // req._id = verifiedToken._id; we will get the id from here as defined in the middleware
  // req._id will come from the middleware , frontend does not need send this id
  try {
    const owner = req._id;
    const { caption } = req.body;
    // console.log("owner", owner);
    const user = await Users.findById(owner);
    // console.log(user);
    const post = await Posts.create({
      owner,
      caption,
    });

    // we need to appednd or add the post id to the posts array in the user model
    user.posts.push(post._id);
    // console.log(post);
    const userSavedPost = await user.save();
    // console.log("posts", post);
    // console.log("user", user);

    // console.log("userSavedPost", userSavedPost);
    return res.send(success(201, post));
  } catch (err) {
    console.log(err);
    return res.send(error(500, err));
  }
};

module.exports = { getAllPostsController, createPostController };
