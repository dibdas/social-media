const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    unique: true,
    required: true,
    type: String,
    // even if the user provides the email input as uppercase , it will be saved in the database as lowercase
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

  avatar: {
    url: String,
    publicId: String,
  },

  // followers are the list of another users
  // this is how we define the array of ObjectIds
  // list of users or the ObjectIds that are following you
  followers: [
    {
      //  this is how you relate the two schemas
      type: mongoose.Schema.Types.ObjectId, // storing the objectId of the user
      // the  ObjectId is refering to the users, users is the name of the mongoose model users
      ref: "users", // the  ObjectId is refering to the users, users is the name of the mongoose model users
    },
  ],
  // list of the users that you following
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // the  ObjectId is refering to the users, users is the name of the mongoose model users
      ref: "users", // the  ObjectId is refering to the users, users is the name of the mongoose model users
    },
  ],
  posts: [
    {
      // the  ObjectId is refering to the posts, posts  is the name of the mongoose model posts
      type: mongoose.Schema.Types.ObjectId, // the  ObjectId is refering to the posts, posts is the name of the mongoose model posts
      ref: "posts",
    },
  ],
});

module.exports = mongoose.model("users", userSchema);
