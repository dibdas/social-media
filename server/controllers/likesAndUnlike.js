const Posts = require("../models/Post");
const { success, error } = require("../utils/responseWrapper");
const { mapPostOutput } = require("../utils/Utils");

const likeandUnlikePostController = async (req, res) => {
  try {
    const { postId } = req.body; // getting the post id
    // current user or the looged in user got the id from req.header from the middleware
    const currentUserId = req._id;
    console.log(currentUserId);
    // const post = await Posts.findById(postId);
    const post = await Posts.findById(postId).populate("owner");
    if (!post) {
      return res.send(error(404, "post not found"));
    }
    // if the currentUserId is present in the likes array ,
    // that means you want to unlike it so removing from the arra
    // then need to remove currentUserId from the likes array , and send success that unliked successfully
    if (post.likes.includes(currentUserId)) {
      // this block is there when you unlike the post
      // getting the index of the currentUserId inside the likes array,
      //    and will remove the index from the array
      const index = post.likes.indexOf(currentUserId);
      //   as currentUserId is in the like Array ,like api is triggered ,therefore removing the currentuserId
      //   from the like array list
      // removing the currentUserId from the likes Array as the currentuserId is present
      //in the likes array, and hitting the like api within the  req.body json is passed as
      // that of the postid that means user wants to unlike the post,
      post.likes.splice(index, 1);
      const newLikesArray = await post.save();
      console.log(newLikesArray);
      // return res.send(success(201, `successfully unlike the post ${post}`));
      // send the post in a new format like the mapPostOutput
      const formattedPost = mapPostOutput(post, req._id);
      console.log("successfully unliked the post", formattedPost);
      return res.send(success(201, { post: formattedPost }));
    }
    // this block is for liking the post
    // else block means currentUserId is not present in likes Array, that means want to like the post
    // therefore currentUserId should be put into the like array list
    else {
      post.likes.push(currentUserId);
      console.log(post.likes);
      const newLikesArray = await post.save();
      console.log(newLikesArray);
      // return res.send(success(201, `successfully like the post ${post}`));
      // sending the post in the new format like the  mapPostOutput
      const formattedPost = mapPostOutput(post, req._id);
      console.log("successfully liked the post", formattedPost);
      return res.send(success(201, { post: formattedPost }));
    }
  } catch (err) {
    console.log(err);
    return res.send(error(500, err));
  }
};
module.exports = { likeandUnlikePostController };
