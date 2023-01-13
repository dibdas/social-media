import React from "react";
import Follower from "../followers/Follower";
import Post from "../post/Post";
import "./Feed.scss";

function Feed() {
  return (
    <div className="feed">
      <div className="container">
        <div className="left-side">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="right-side">
          <div className="following">
            <h3 className="title">You are following</h3>
            <Follower />
            <Follower />
            <Follower />
            <Follower />
            <Follower />
          </div>
          <div className="suggesstions">
            <h3 className="title">Suggessted For You</h3>
            <Follower />
            <Follower />
            <Follower />
            <Follower />
            <Follower />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
