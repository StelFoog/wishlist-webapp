import React from "react";
import ProfilePicture from "../../../../../components/profilePicture/ProfilePicture";

export default ({ name, profilePictureUrl }) => (
  <div>
    <div className="userWhoClaimed">
      <ProfilePicture src={profilePictureUrl} width={40} />
      <div className="userWhoClaimedName">
        <p>{name}</p>
      </div>
    </div>
  </div>
);
