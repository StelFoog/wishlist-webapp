import React from "react";
import CardContainer from "../card/CardContainer";
import { CardContent, CardHeader } from "../card";
import ProfilePicture from "../profilePicture/ProfilePicture.js";
import Button from "../button";

const userCard = ({user, onShare}) => {
  return(
    <CardContainer children={
      <CardContent children={
        <div className="userCard">
          <ProfilePicture src={user.profilePictureUrl} />
          <p>{user.name}</p>
          <CardActions
            <Button
              variant="filled"
              label="Add"
              handleClick={onShare}
              color="#9f003f"
            />
          </CardActions>
        </div>
      }/>
    }/>
  );
}

export default userCard;
