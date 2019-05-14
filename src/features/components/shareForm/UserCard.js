import React from "react";
import CardContainer from "../card/CardContainer";
import { CardContent } from "../card";
import ProfilePicture from "../profilePicture/ProfilePicture.js";
import Button from "../button";

const UserCard = ({user, buttonText, buttonColor, onClick}) => {
  return(
    <CardContainer>
      <div className="userCard">
        <CardContent>
            <ProfilePicture 
              src={user.profilePictureUrl}
              width="50px"
            />
            {user.name}
            <div className="userCardButton">
              <Button
                variant="filled"
                label={buttonText}
                handleClick={onClick}
                color={buttonColor}
              />
            </div>
        </CardContent>
      </div>
    </CardContainer>
  );
}

export default UserCard;
