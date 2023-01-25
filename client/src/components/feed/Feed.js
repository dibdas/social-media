import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedData } from "../../redux/slices/feedSlice";
import Follower from "../followers/Follower";
import Post from "../post/Post";
import "./Feed.scss";

function Feed() {
  const dispatch = useDispatch();
  const feedData = useSelector((state) => state.feedReducer.feedData);
  console.log(feedData);

  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch]);

  return (
    <div className="feed">
      <div className="container">
        <div className="left-side">
          {feedData?.fullModifiedPostsOfFollowings?.map((post) => (
            <Post post={post} key={post?._id} />
          ))}
        </div>
        <div className="right-side">
          <div className="following">
            <h3 className="title">You are following</h3>
            {feedData?.followings?.map((user, id) => (
              <Follower user={user} key={id} />
            ))}
          </div>
          <div className="suggesstions">
            <h3 className="title">Suggessted For You</h3>
            {feedData?.suggestionUsers?.map((user, id) => (
              <Follower user={user} key={id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
