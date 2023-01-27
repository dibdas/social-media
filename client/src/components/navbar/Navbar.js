import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import "./Navbar.scss";
import { FiLogOut } from "react-icons/fi";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateMyProfile } from "../../redux/slices/appConfigSlice";
import axiosClient from "../../utils/axiosClient";
import {
  KEY_ACCESS_TOKEN,
  removingItemFromLocalStorage,
} from "../../utils/localStorageManager";
import { useEffect } from "react";

function Navbar() {
  // dispatch is not required now as we are not dispatching anythng as of but keeping
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myProfileInfo = useSelector(
    (state) => state.appConfigReducer.myProfile
  );
  const upDateMyProfileInfo = useSelector(
    (state) => state.appConfigReducer.updateMyProfile
  );
  console.log(myProfileInfo);
  // moving the loadingRef to app.js
  // const loadingRef = useRef(null);
  // const [loading, setLoading] = useState(false);

  // function toggleLoadingBar() {
  // if (loading) {
  // setLoading(!loading);
  // dispatch(setLoading(true));
  // loadingRef.current.complete();
  // } else {
  // setLoading(!loading);
  // dispatch(setLoading);
  // loadingRef.current.continuousStart();
  // }
  // }
  async function handleLogoutClicked(event) {
    event.preventDefault();
    try {
      // moving setLoading to axios client to optimize the code
      // dispatch(setLoading(true));
      await axiosClient.post("/auth/logout");
      removingItemFromLocalStorage(KEY_ACCESS_TOKEN);
      navigate("/login");
      // moving setLoading to axios client to optimize the code
      // dispatch(setLoading(false));
    } catch (err) {
      console.log(err);
    }
  }
  // useEffect(() => {}, [upDateMyProfileInfo]);

  return (
    <div className="navbar">
      {/* moving the loading bar to the app.js */}
      {/* <LoadingBar color="#f11946" ref={loadingRef} height={4} /> */}
      <div className="container">
        {/* clicking on Social-Media it will take you or navigate you to the defined path mentioned inside the navigate() */}
        <h2 className="banner hover-link" onClick={() => navigate("/")}>
          Social-Media
        </h2>
        <div className="right-side">
          <div
            className="profile hover-link"
            // navigating to individual profile id
            onClick={() => navigate(`/profile/${myProfileInfo?.user?._id}`)}
          >
            <Avatar src={myProfileInfo?.user?.avatar?.url} />
          </div>
          <div className="logout hover-link" onClick={handleLogoutClicked}>
            <FiLogOut />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
