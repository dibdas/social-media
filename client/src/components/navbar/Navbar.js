import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import "./Navbar.scss";
import { FiLogOut } from "react-icons/fi";
import LoadingBar from "react-top-loading-bar";

function Navbar() {
  const navigate = useNavigate();
  const loadingRef = useRef();
  const [loading, setLoading] = useState(false);
  function toggleLoadingBar() {
    if (loading) {
      setLoading(!loading);
      loadingRef.current.complete();
    } else {
      setLoading(!loading);
      loadingRef.current.continuousStart();
    }
  }
  return (
    <div className="navbar">
      <LoadingBar color="#f11946" ref={loadingRef} height={4} />
      <div className="container">
        {/* clicking on Social-Media it will take you or navigate you to the defined path mentioned inside the navigate() */}
        <h2 className="banner hover-link" onClick={() => navigate("/whatever")}>
          Social-Media
        </h2>
        <div className="right-side">
          <div
            className="profile hover-link"
            onClick={() => navigate("/profile/gy5bsa")}
          >
            <Avatar />
          </div>
          <div className="logout hover-link" onClick={toggleLoadingBar}>
            <FiLogOut />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
