import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../avatar/Avatar";
import "./Navbar.scss";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
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
        </div>
      </div>
    </div>
  );
}

export default Navbar;
