import React from "react";
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
        <div className="right-side">r</div>
      </div>
    </div>
  );
}

export default Feed;
