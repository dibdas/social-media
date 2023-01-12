import React from "react";
import userAvatar from "../../assets/superhero.png";
import "./Avatar.scss";

function Avatar({ src }) {
  return (
    <div className="Avatar">
      <img src={src ? src : userAvatar} alt="" />
    </div>
  );
}

export default Avatar;
