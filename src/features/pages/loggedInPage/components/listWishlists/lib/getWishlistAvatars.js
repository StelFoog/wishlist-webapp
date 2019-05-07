import React from "react";
import ProfilePicture from "../../../../../components/profilePicture/ProfilePicture.js";

const MAX_WISHLIST_AVATARS = 5;

function homog_seq(x, n) {
  let seq = [];
  for (let i = 0; i < n; ++i) {
    seq.unshift(x);
  }
  return seq;
}

function getUserAvatarElem(user) {
  return (
    <ProfilePicture
      src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
      width="30px"
    />
  );
}

const moreMembers = (
  <ProfilePicture
    src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
    width="30px"
  />
);

function getWishlistAvatars(wishlist) {
  const members = homog_seq(1, 10); //
  const avatars = members
    .slice(0, Math.min(MAX_WISHLIST_AVATARS - 1, members.length))
    .map(getUserAvatarElem);

  if (members.length >= MAX_WISHLIST_AVATARS)
    avatars.push(
      members.length === MAX_WISHLIST_AVATARS
        ? getUserAvatarElem(members[MAX_WISHLIST_AVATARS - 1])
        : moreMembers
    );
  return avatars;
}

export default getWishlistAvatars;
