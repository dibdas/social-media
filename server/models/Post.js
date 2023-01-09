const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  owner: {
    // it is the individual who giving the post
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  image: {
    publicId: String,
    url: String,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});
module.exports = mongoose.model("posts", postSchema);
