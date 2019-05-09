import React from "react";
import "./chatBubble.css";
import "../../../index.css";
import ProfilePicture from "../profilePicture";

const ChatBubble = ({ message, user, sent = false }) => (
  <div className="tempBackground">
    <React.Fragment>
      <div className="messageContent">
        <div className="imageContainer">
          <ProfilePicture
            width={40}
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
          />
        </div>
        <div className="chatNameContiner">
          <span>Name</span>
          <div className="chatBubble">
            <p>
              {
                "Aute quis ipsum dolor enim proident deserunt officia enim labore dolor irure aliquip dolor.Sint et veniam incididunt adipisicing aliquip eu labore deserunt est cupidatat nisi incididunt excepteur Lorem. Do ea officia nulla enim adipisicing mollit sunt. In aliquip enim adipisicing minim. Quis sit eu mollit ex duis do do officia in. Quis commodo sint exercitation aliqua. Occaecat ipsum ad aliquip non esse aliquip cillum nisi nisi laboris dolore adipisicing. Sit velit nisi cupidatat eu tempor labore est nisi."
              }
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  </div>
);

export default ChatBubble;
