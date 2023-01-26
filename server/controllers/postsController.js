const { error, success } = require("../utils/responseWrapper");
const Posts = require("../models/Post");
const Users = require("../models/User");
const cloudinary = require("cloudinary").v2;

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
    // const { caption } = req.body;
    const { caption, postImage } = req.body;

    if (!caption) {
      return res.send(error(400, `all field are required`));
    }
    if (!postImage) {
      return req.send(error(400, `post Image required `));
    }

    const cloudImage = await cloudinary.uploader.upload(postImage, {
      folder: "postImages",
    });

    // console.log("owner", owner);
    const user = await Users.findById(owner);
    // console.log(user);
    const post = await Posts.create({
      owner,
      caption,
      image: {
        publicId: cloudImage.public_id,
        url: cloudImage.url,
      },
    });

    // we need to appednd or add the post id to the posts array in the user model
    user.posts.push(post._id);
    // console.log(post);
    const userSavedPost = await user.save();
    // console.log("posts", post);
    // console.log("user", user);

    console.log("userSavedPost", userSavedPost);
    return res.send(success(201, { post }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, err));
  }
};

const updatePostController = async (req, res) => {
  try {
    const currentUserId = req._id;
    const { postId, caption } = req.body;
    const post = await Posts.findById(postId);
    console.log("ppost owner", post.owner.toString());
    if (!post) {
      return res.send(error(404, `post not found`));
    }
    // checking whether the owner of the post is the currentuser or not, if not then the post cant be updated
    if (post.owner.toString() !== currentUserId) {
      return res.send(error(403, `unauthorized attempt to update the post`));
    }
    if (caption) {
      post.caption = caption;
      const savedPost = await post.save();
      return res.send(success(201, `post successfully saved ${savedPost}`));
    }
  } catch (err) {
    return res.send(error(500, err));
  }
};

const deletePostcontroller = async (req, res) => {
  try {
    const currentUserId = req._id;
    const { postId } = req.body;

    const post = await Posts.findById(postId);

    const currentUser = await Users.findById(currentUserId);

    if (!post) {
      return res.send(error(404, `post not found`));
    }
    if (currentUserId !== post.owner.toString()) {
      return res.send(error(409, "unauthorized to delete the post "));
    }
    const index = currentUser.posts.indexOf(postId);
    console.log(index);
    currentUser.posts.splice(index, 1);
    await currentUser.save();
    await post.remove();
    return res.send(success(200, `successfully removed the post`));
  } catch (err) {
    return res.send(error(500, err));
  }
};

const getMyPosts = async (req, res) => {
  try {
    const currentUserId = req._id;
    // getting all the post where the owner is equal to currentuser Id
    // populate helps in fetching all the details whoever liked the post
    // populate can happen as we have defined ref:"users" in the postSchema
    // we can do populate here , it is because , we have done reference in the postSchema
    const allMyPost = await Posts.find({ owner: currentUserId }).populate(
      "likes"
    );
    return res.send(success(200, allMyPost));
  } catch (err) {
    return res.send(error(500, err));
  }
};
const getUserPostController = async (req, res) => {
  try {
    const currentUserId = req._id;
    const { userId } = req.body;
    if (!userId) {
      return res.send(error(404, `userId reqired`));
    }
    const allUserPost = await Posts.find({ owner: userId }).populate("likes");
    if (allUserPost.length === 0) {
      return res.send(error(404, `no post available`));
    } else {
      return res.send(success(200, { allUserPost }));
    }
  } catch (err) {
    return res.send(error(500, err));
  }
};

module.exports = {
  getAllPostsController,
  createPostController,
  updatePostController,
  deletePostcontroller,
  getMyPosts,
  getUserPostController,
};
