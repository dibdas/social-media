import React from "react";
import Avatar from "../avatar/Avatar";
import "./Post.scss";
import { AiOutlineHeart } from "react-icons/ai";
import backgroundImage from "../../assets/pexels-andy-vu-3244513.jpg";

function Post({ post }) {
  return (
    <div className="Post">
      <div className="heading">
        <Avatar />
        <h4>Peter Gomes</h4>
      </div>
      <div className="content">
        <img src={backgroundImage} alt="" />
      </div>
      <div className="footer">
        <div className="like">
          <AiOutlineHeart className="icon" />
          <h4>4 likes</h4>
        </div>
        <p className="caption">
          This is nature Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Corporis, repudiandae.
        </p>
        <h6 className="time-ago">4hrs ago</h6>
      </div>
    </div>
  );
}

export default Post;
