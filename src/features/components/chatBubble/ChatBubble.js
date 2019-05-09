import React from "react";
import "./chatBubble.css";
import "../../../index.css";
import ProfilePicture from "../profilePicture"

const ChatBubble = ({ username, userProfilePicture, messageText, sent = false }) => {

  if (sent) {
    return (
      <React.Fragment>
        <div className="messageContent messageContentSent">
          <div className="imageContainer">
            <ProfilePicture width={40} src={userProfilePicture} />
          </div>
          <div className="chatNameContiner">
            <span>{username}</span>
            <div className="chatBubble chatBubbleSent">
              <p>
                {messageText}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
  else {
    return (
      <React.Fragment>
        <div className="messageContent">
          <div className="imageContainer">
            <ProfilePicture width={40} src={userProfilePicture} />
          </div>
          <div className="chatNameContiner">
            <span>{username}</span>
            <div className="chatBubble">
              <p>
                {messageText}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChatBubble;