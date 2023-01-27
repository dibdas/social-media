import React from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiFillHeart } from "react-icons/ai";
import backgroundImage from "../../assets/pexels-andy-vu-3244513.jpg";
import { useDispatch, useSelector } from "react-redux";
import { likeAndUnlikePost } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";
import { showingToast } from "../../redux/slices/appConfigSlice";

function Post({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handlePostLike() {
    dispatch(likeAndUnlikePost({ postId: post?._id }));
    dispatch(
      showingToast({ type: "TOAST_SUCCESS", message: "like or unlike" })
    );
    console.log(post?.likesCount);
  }
  return (
    <div className="Post">
      <div
        className="heading"
        onClick={() => navigate(`/profile/${post?.owner?._id}`)}
      >
        <Avatar src={post?.owner?.avatar?.url} />
        <h4>{post?.owner?.name}</h4>
      </div>
      <div className="content">
        <img src={post?.image?.url || backgroundImage} alt="" />
      </div>
      <div className="footer">
        <div className="like" onClick={handlePostLike}>
          {post?.isLiked ? (
            <AiFillHeart className="icon" style={{ color: "red" }} />
          ) : (
            <AiFillHeart />
          )}
          <h4>{`${post?.likesCount} likes`}</h4>
        </div>
        <p className="caption">{`${post?.caption}`}</p>
        <h6 className="time-ago">{`${post?.timeAgo}`}</h6>
      </div>
    </div>
  );
}

export default Post;
