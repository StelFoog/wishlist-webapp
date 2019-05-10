import React from "react";
import "./chatBubble.css";
import ProfilePicture from "../../../../components/profilePicture";

const ChatBubble = ({
  username,
  sameSender = false,
  userProfilePicture,
  messageText,
  timestamp,
  sent = false
}) => {
  let text = messageText.split(/(?:\r\n|\r|\n)/g);
  return (
    <div className={`messageContent ${sent ? "messageContentSent" : ""}`}>
      <div className={`imageContainer ${sameSender ? "noPicture" : ""}`}>
        {!sameSender && <ProfilePicture width={40} src={userProfilePicture} />}
      </div>
      <div className="chatNameContainer">
        {!sameSender && <span>{username}</span>}
        <div className="chatBubbleContainer">
          <div className={`chatBubble ${sent ? "chatBubbleSent" : ""}`}>
            {text &&
              text.map((value, index) => (
                <p
                  key={`${timestamp.seconds} ${
                    timestamp.nanoseconds
                  } ${username} ${index}`}
                >
                  {value}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatBubble;
