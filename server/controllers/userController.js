const { error, success } = require("../utils/responseWrapper");
const Posts = require("../models/Post");
const Users = require("../models/User");

const { mapPostOutput } = require("../utils/Utils");
// before send the response to the frontend directly , would like modify the response , we can
// map this response so that frontend show the output in a better format
const getUserProfileController = async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(userId);

    // populating all the posts of the owner and poulating owner details of all the posts
    const user = await Users.findById(userId).populate({
      // populating the owner detail of all the posts
      path: "posts",
      //   for all the post the owner will be this userId ,but here we are also populating the owner
      //   to all the posts it is because , while fetching the posts from the frontend , we
      //   want to attach the owner details of all those posts coming from the backend to frontend
      //   such that we dont have to work too much in the frontend
      populate: { path: "owner" }, // we get all the details of the owner
    });
    if (!user) {
      return res.send(error(404, `user not found`));
    }
    const fullPosts = user.posts;
    // using reverse so that the array  will bring up the latest one
    const modifiedPosts = fullPosts
      .map((items) => mapPostOutput(items, req._id))
      .reverse();
    // console.log(modifiedPosts);
    // when we do the User.findById , we get a lot of information which includes
    // mongoose information also inside the user,
    //  hence user._doc contains the actual relevent information , which is relevent to the schema
    // user._doc contains the actual relevent schema information which is relevent to user
    // updating posts with these modifiedPosts and sending it ,therefor post route is being updated
    // with these modifiedPosts , and it will be send to the frontend
    return res.send(success(200, { ...user._doc, modifiedPosts }));
  } catch (err) {
    console.log(err);
    return res.send(error(500, err));
  }
};
module.exports = {
  // before send the response to the frontend directly , would like modify the response , we can
  // map this response so that frontend show the output in a better format
  getUserProfileController,
};
