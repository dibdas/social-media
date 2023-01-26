const Users = require("../models/User");
const { success, error } = require("../utils/responseWrapper");
const Posts = require("../models/Post");
const { mapPostOutput } = require("../utils/Utils");
const cloudinary = require("cloudinary").v2;

const followerOrUnFollowUsers = async (req, res) => {
  try {
    const { userIdToFollow } = req.body; // the user you want to follow
    const currentUserId = req._id;
    console.log("userIdToFollow", userIdToFollow);
    console.log(currentUserId);
    if (currentUserId === userIdToFollow) {
      return res.send(error(409, "user cant follow himself/ herself "));
    }
    //   trying to find out whether the user present in the User model or not
    const userToFollow = await Users.findById(userIdToFollow);
    // checking whether the current user id is present in the user model or not
    const currentUser = await Users.findById(currentUserId);
    if (!currentUserId) {
      return res.send(error(404, `current user is not found`));
    }
    if (!userToFollow) {
      return res.send(error(404, `user to follow  not found`));
    }
    //   checking whther the currentuser has been following this user or not, if so he would definitely
    //   like to unfollow this guy by hiiting this api
    if (currentUser.followings.includes(userIdToFollow)) {
      // checking already followed or not , if so then unfollow

      const followingIndex = currentUser.followings.indexOf(userIdToFollow);
      console.log("followingIndex", followingIndex);
      // unfollowing the guy from the currentuser following list
      currentUser.followings.splice(followingIndex, 1);

      const followerIndex = userToFollow.followers.indexOf(currentUserId);
      console.log("followerIndex", followerIndex);
      // removing the currentuser from the follower list of the guy whom current user want to unfollow
      userToFollow.followers.splice(followerIndex, 1);
      const cU = await currentUser.save();
      const uTF = await userToFollow.save();
      console.log("current User", cU);
      console.log("user To follow ", uTF);
      console.log(`user successfully unfollowed`);
      // return res.send(success(201, `user successfully unfollowed`));

      return res.send(success(201, { user: userToFollow }));
    }
    // else block where the currentUser should follow
    else {
      // follow
      currentUser.followings.push(userIdToFollow);
      userToFollow.followers.push(currentUserId);
      const cuF = await currentUser.save();
      const uTfUf = await userToFollow.save();
      console.log("current user", cuF);
      console.log("user To follow", uTfUf);
      console.log(`user successfully followed`);
      return res.send(success(201, { user: userToFollow }));
    }
  } catch (err) {
    console.log(err);
    return res.send(error(500, err));
  }
};

const getPostFollowingUsers = async (req, res) => {
  try {
    const currentUserId = req._id;
    // const currentUser = await Users.findById(currentUserId);
    const currentUser = await Users.findById(currentUserId).populate(
      "followings"
    );
    //   here we are trying to find out all the posts whos owner are inside the currentUser followings
    //   if the currentUser is following four people , the post will be fetched if the owner of the posts
    //   matches with currentUser followings list
    // const posts = await Posts.find({
    const fullPosts = await Posts.find({
      // owner $in i.e inside currentUser followings
      owner: {
        //   $in inside operator so it is for inside
        $in: currentUser.followings,
      },
    }).populate("owner");

    console.log("fullPosts", fullPosts);

    const fullModifiedPostsOfFollowings = fullPosts
      .map((item) => mapPostOutput(item, req._id))
      .reverse();

    // getting the Ids of the followings
    const followingsIds = currentUser.followings.map((item) => item._id);
    // pushing id in the followings list so it wont come in the suggestion
    followingsIds.push(req._id);
    console.log("followingsIds", followingsIds);

    const suggestionUsers = await Users.find({
      _id: {
        // it will return all the ids which are not in the followingsIds
        $nin: followingsIds,
      },
    });

    // return res.send(success(201, posts));
    console.log(`suggestionUsers`, suggestionUsers);
    // ...currentUser._doc is the data coming from the populate
    return res.send(
      success(201, {
        ...currentUser._doc,
        suggestionUsers,
        fullModifiedPostsOfFollowings,
      })
    );
  } catch (err) {
    console.log(err);
    return res.send(error(500, err));
  }
};

const getMyInfo = async (req, res) => {
  try {
    const userId = req._id;
    console.log("userId", userId);
    const user = await Users.findById(userId);
    if (!user) {
      return res.send(error(404, `user not found`));
    } else {
      return res.send(success(200, { user }));
    }
  } catch (err) {
    return res.send(error(500, err));
  }
};

const updateMyProfileContoller = async (req, res) => {
  try {
    const { name, bio, userImage } = req.body;
    const user = await Users.findById(req._id);

    if (!user) {
      return res.send(error(404, `user not found`));
    }
    if (name) {
      user.name = name;
    }
    if (bio) {
      user.bio = bio;
    }
    if (userImage) {
      // image is being uploaded here
      const cloudImage = await cloudinary.uploader.upload(userImage, {
        // userProfileImage this is the folder inside the cloudinary
        folder: "userProfileImage",
      }); // image is being uploaded here

      user.avatar = {
        url: cloudImage.secure_url, //we use url when we need to load the image somewhere
        publicId: cloudImage.public_id, // publicId is used , in order to find the image inside the cloudinary
      };
    }
    await user.save();
    console.log("userupdated", user);
    return res.send(success(200, { user }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, err));
  }
};

module.exports = {
  followerOrUnFollowUsers,
  getPostFollowingUsers,
  getMyInfo,
  updateMyProfileContoller,
};
