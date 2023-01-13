import React from "react";
import "./UpdateProfile.scss"; // make themes google search social media themes
import userImg from "../../assets/hacker.png";

function UpdateProfile() {
  return (
    <div className="UpdateProfile">
      <div className="container">
        <div className="left-side">
          <img src={userImg} alt="user-image" />
        </div>
        <div className="right-side">
          <form>
            <input type="text" placeholder="Your name" />
            <input type="text" placeholder="your bio " />
            <button type="submit" className="btn-primary">
              Submit
            </button>
          </form>
          <button className="btn-primary delete-account ">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
