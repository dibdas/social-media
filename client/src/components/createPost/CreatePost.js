import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import "./CreatePost.scss";
import backgroundImage from "../../assets/nbg.jpg";
import { BsCardImage } from "react-icons/bs";
import axiosClient from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { getUserProfile } from "../../redux/slices/postSlice";

function CreatePost() {
  const [postImage, setPostImage] = useState("");
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  // appConfigSlice used by tutor
  // const myProfile =useSelector((state)=>state.appConfigSlice.myProfile)
  const userProfile = useSelector((state) => state.postsReducer.userProfile);
  const userId = userProfile?._id;

  function handlePostChange(event) {
    event.preventDefault();
    console.log("createpost");
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostImage(fileReader.result || "");
      }
    };
  }
  async function handlePostSubmit(event) {
    event.preventDefault();
    console.log("clicked");
    try {
      // before the api call want to setLoading true
      // moving setLoading to axios client to optimize the code
      // dispatch(setLoading(true));
      const postResponse = await axiosClient.post("/post/new", {
        caption,
        postImage,
      });
      console.log("post done ", postResponse);
      dispatch(getUserProfile({ userId }));
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    } finally {
      // after the post is done then seTloading is is defined as false
      // moving setLoading to axios client to optimize the code
      // dispatch(setLoading(false));
      //after the post is done setting caption and post image as empty
      setCaption("");
      setPostImage("");
    }
  }
  return (
    <div className="Create-post">
      <div className="left-part">
        <Avatar src={userProfile?.avatar?.url} />
      </div>
      <div className="right-part">
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="captionInput"
          placeholder="whats on you mind ?"
        />
        {postImage && (
          <div className="image-container">
            <img
              className="post-image"
              alt="post-image"
              src={postImage ? postImage : backgroundImage}
            />
          </div>
        )}
        <div className="bottom-part">
          <div className="input-post-image">
            <label htmlFor="postInputImg" className="labelPostImage">
              <BsCardImage />
            </label>
            <input
              id="postInputImg"
              type="file"
              className="input-Image"
              accept="image/*"
              onChange={handlePostChange}
            />
          </div>
          <div className="post-btn btn-primary" onClick={handlePostSubmit}>
            Post
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
