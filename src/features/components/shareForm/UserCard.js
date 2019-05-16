import React from "react";
import CardContainer from "../card/CardContainer";
import { CardContent } from "../card";
import ProfilePicture from "../profilePicture/ProfilePicture.js";
import Button from "../button";
import Paper from "../paper";
import "./userCard.css";

const UserCard = ({user, buttonText, buttonColor, onClick}) => {
  return(
    <Paper>
      <div className="userCard">
        <div className="userAvatar">
          <ProfilePicture
            src={user.profilePictureUrl}
            width="50px"
          />
        </div>
        <div className="username">
          {user.name}
        </div>
        <div className="addOrRemoveButton">
          <Button
            fontSize="1rem"
            padding="0.5rem 1rem"
            variant="filled"
            label={buttonText}
            handleClick={onClick}
            color={buttonColor}
          />
        </div>
      </div>
    </Paper>
  );
    /*<CardContainer>
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
    </CardContainer>*/
}

export default UserCard;
