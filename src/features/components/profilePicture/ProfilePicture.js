import React, { Component } from 'react';
import "./profilePicture.css";


const ProfilePicture = ({src, width = 100}) => (
    <img
      className="profilePicture"
      src={src}
      style={{ width: width }}
    ></img>
  );



export default ProfilePicture;
