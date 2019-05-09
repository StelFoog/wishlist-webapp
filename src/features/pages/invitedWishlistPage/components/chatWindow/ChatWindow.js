import React from "react";
import { onChatMessageReceived } from "../../../../lib/chat/db.js";
import Button from "../../../../components/button";

import { formatTimeStamp } from "./lib";
import ChatBubble from "../chatBubble";

import "./chatWindow.css";

const submitClick = props => {
  return () => {
    const elem = document.getElementById("chatInput");
    const text = elem.value;
    elem.value = "";
    props.handleChatSend(0, text);
  };
};

const createChatClick = props => {
  return () => {
    props.handleCreateChat(0);
  };
};

class ChatWindow extends React.Component {
  componentDidMount() {
    document
      .querySelector(".chat")
      .scrollTo(0, document.querySelector(".chat").scrollHeight);
    this.unlisten = onChatMessageReceived(
      0,
      (props => {
        return chat => {
          props.handleChatUpdate(chat);
        };
      })(this.props)
    );
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="chatWindow">
        <div className="chat">
          {messages.map(msg => (
            <ChatBubble
              username={msg.senderName}
              messageText={msg.text}
              userProfilePicture={msg.photoURL}
            />
          ))}
        </div>
        <div className="chat-input">
          <input type="text" id="chatInput" />
          <Button
            handleClick={submitClick(this.props)}
            label="Send message"
            variant="filled"
            color="#73359B"
          />
          <Button
            handleClick={createChatClick(this.props)}
            label="Create a new chat"
            variant="filled"
            color="#ff4f12"
          />
        </div>
      </div>
    );
  }
}

export default ChatWindow;
