const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
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
        // while populating mongodb knows the objectId is present in the user table
        // in order to do the populate we must do the refrence
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true } // through timestamps moongose ad two fields created_at , updated_at
);
module.exports = mongoose.model("posts", postSchema);
