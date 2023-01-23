import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import "./Profile.scss";
import userImg from "../../assets/superhero.png";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../createPost/CreatePost";
import { getUserProfile } from "../../redux/slices/postSlice";

function Profile() {
  const myProfileInfo = useSelector(
    (state) => state.appConfigReducer.myProfile
  );
  const navigate = useNavigate();
  const params = useParams(); // lets us know about the parameters
  console.log(params);
  const { userId } = params;
  console.log(userId);
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.postsReducer.userProfile);
  console.log(userProfile);
  const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
  console.log(myProfile);
  // made this state variable in order to check whether the current user is the loggedIn user or not
  const [isMyProfile, setIsMyProfile] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile({ userId }));
    setIsMyProfile(myProfile?.user?._id === userId);
  }, [myProfile, userId]);

  return (
    <div className="Profile">
      <div className="container">
        <div className="left-side">
          <CreatePost />
          {userProfile?.modifiedPosts?.map((post, id) => (
            <Post post={post} key={id} />
          ))}
          {/* <Post />
          <Post />
          <Post /> */}
        </div>
        <div className="right-side">
          <div className="profile-card">
            <img src={userProfile?.avatar?.url} className="user-image" />
            <h3 className="user-name">{userProfile?.name}</h3>
            <div className="follower-info">
              <h4>{`${userProfile?.followers?.length}`} followers</h4>
              <h4>{`${userProfile?.followings?.length}`} followings</h4>
            </div>
            {/* if it is not my profile then show the follow button */}
            {/* therefore if the isMyProfile is false i.e not true then show the follow button */}
            {!isMyProfile && (
              <button className="follow btn-primary">follow</button>
            )}
            {isMyProfile && (
              <button
                className="update-profile btn-secondary"
                onClick={() =>
                  navigate(`/updateprofile/${myProfileInfo?.user?._id}`)
                }
              >
                Update Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
