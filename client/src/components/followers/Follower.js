import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followAndUnfollow } from "../../redux/slices/feedSlice";
import Avatar from "../avatar/Avatar";
import "./Follower.scss";

function Follower({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const feedDatas = useSelector((state) => state.feedReducer.feedData);
  // console.log(`feedDatas`, feedDatas);
  const [isFollowing, setIsFollowing] = useState("");
  useEffect(() => {
    // checking whether the user.id is present in the following list or not , if it is there , then
    // I am following that that guy so not need to follow again that unfollow button show appear
    // // instead of follow
    // if (feedDatas?.followings?.find((item) => item._id === user._id)) {
    //   setIsFollowing(true);
    // } else {
    //   setIsFollowing(false);
    // }
    // removing if else by doing in one line , it is instead of if and else
    setIsFollowing(
      feedDatas?.followings?.find((item) => item._id === user._id)
    ); //
  }, [feedDatas]);

  // not making the handleUserFollow async , it is because of the API call is happening inside the
  // Asyncthunk
  async function handleUserFollow() {
    console.log("handle follow ");
    dispatch(followAndUnfollow({ userIdToFollow: user._id }));
  }

  return (
    <div className="Follower">
      <div
        className="user-info"
        onClick={() => navigate(`/profile/${user._id}`)}
      >
        <Avatar src={user?.avatar?.url} />
        <h4 className="name">{user?.name}</h4>
      </div>
      <h5
        onClick={handleUserFollow}
        className={isFollowing ? "hover-link follow-link" : "btn-primary"}
      >
        {isFollowing ? `unfollow` : `follow`}
      </h5>
    </div>
  );
}

export default Follower;
