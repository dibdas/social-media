import React from "react";
import Post from "../post/Post";
import "./Profile.scss";
import userImg from "../../assets/superhero.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const myProfileInfo = useSelector(
    (state) => state.appConfigReducer.myProfile
  );
  const navigate = useNavigate();
  return (
    <div className="Profile">
      <div className="container">
        <div className="left-side">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="right-side">
          <div className="profile-card">
            <img src={userImg} className="user-image" />
            <h3 className="user-name">David rozario</h3>
            <div className="follower-info">
              <h4>40 followers</h4>
              <h4>30 following</h4>
            </div>
            <button className="follow btn-primary">follow</button>
            <button
              className="update-profile btn-secondary"
              onClick={() => navigate(`/updateprofile/${myProfileInfo?._id}`)}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
