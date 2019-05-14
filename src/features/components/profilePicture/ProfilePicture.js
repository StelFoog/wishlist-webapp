import React from "react";
import "./profilePicture.css";

const ProfilePicture = ({ src, width = 100 }) => (
  <div
    className="profilePicture"
    style={{
      width: width,
      height: width,
      backgroundImage: `url(${src})`
    }}
  />
);

export default ProfilePicture;
