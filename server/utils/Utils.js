// here post is the mongodb post , which contains Id, caption , image ,and mongodb object of the owner

// userId is the logged in userId
const mapPostOutput = (post, userId) => {
  return {
    _id: post._id,
    caption: post.caption,
    image: post.image,
    owner: {
      _id: post.owner._id,
      name: post.owner.name,
      avatar: post.owner.avatar,
    },

    likesCount: post.likes.length,
    // userId is the logged in userId,
    // checking whether userId present inside the likes array or notify,
    // if its there that means the post has been liked by the logged user i.e userId
    isLiked: post.likes.includes(userId),
  };
};

module.exports = { mapPostOutput };
