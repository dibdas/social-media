const Users = require("../models/User");
const { success, error } = require("../utils/responseWrapper");

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
      console.log("followerIndex", userIdToFollow.follower);
      // removing the currentuser from the follower list of the guy whom current user want to unfollow
      userToFollow.followers.splice(followerIndex, 1);
      const cU = await currentUser.save();
      const uTF = await userToFollow.save();
      console.log("cu", cU);
      console.log("uTF", uTF);
      return res.send(success(201, `user successfully unfollowed`));
    }
    // else block where the currentUser should follow
    else {
      // follow
      currentUser.followings.push(userIdToFollow);
      userToFollow.followers.push(currentUserId);
      await currentUser.save();
      await userToFollow.save();
      return res.send(success(201, `user successfully followed`));
    }
  } catch (err) {
    console.log(err);
    return res.send(error(500, err));
  }
};

const getPostFollowingUsers = async (req, res) => {};
module.exports = { followerOrUnFollowUsers };
