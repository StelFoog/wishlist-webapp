import React from "react";
import { onChatMessageReceived } from "../../../lib/chat/db.js";

import { RoundKeyboardArrowLeft } from "../../svgIcon";
import Paper from "../../paper";
import InputBase from "@material-ui/core/InputBase";
import Ripple from "../../ripple";
import { InsertEmoji } from "../../svgIcon";
import ChatBubble from "./chatBubble";
import EmojiSelector from "../EmojiSelector";
import Button from "../../button";
import "./chatWindow.css";

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);

    this.addEmoji = this.addEmoji.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeEmojiKeyboard = this.closeEmojiKeyboard.bind(this);

    this.state = {
      input: "",
      showEmojiKeyboard: false
    };
  }

  componentDidMount() {
    const { wishlistUid } = this.props;
    this.unlisten = onChatMessageReceived(
      wishlistUid,
      (props => {
        return chat => {
          props.handleChatUpdate(chat);
          document
            .querySelector(".chat")
            .scrollTo(0, document.querySelector(".chat").scrollHeight);
        };
      })(this.props)
    );
  }

  componentWillUnmount() {
    this.unlisten();
  }

  submitClick() {
    const { handleChatSend, wishlistUid } = this.props;
    let { input } = this.state;

    if (input !== "") {
      this.setState({ input: "", showEmojiKeyboard: false });
      handleChatSend(wishlistUid, input);
    }
  }

  addEmoji(data) {
    const { native } = data;
    const { input } = this.state;
    this.setState({ input: input + native });
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.submitClick();
    }
  };

  closeEmojiKeyboard() {
    this.setState({ showEmojiKeyboard: false });
  }

  render() {
    const { messages, user, showChat, toggleChatWindow } = this.props;
    const { showEmojiKeyboard } = this.state;

    let prevMsgSender = "",
      sameSender = false;
    return (
      <Paper elevation={2}>
        <div
          className={`chatWindow ${
            showChat ? "mobile-visible" : "mobile-hidden"
          }`}
        >
          <div className="chat-mobile-header">
            <div className="chat-back-button" onClick={toggleChatWindow}>
              <Ripple />
              <RoundKeyboardArrowLeft color="var(--color-primary)" />
            </div>
          </div>
          <div className="chat">
            {messages &&
              messages.map((msg, index) => {
                sameSender = prevMsgSender === msg.senderName;

                prevMsgSender = msg.senderName;
                return (
                  <ChatBubble
                    key={`msg ${index}`}
                    sameSender={sameSender}
                    username={msg.senderName}
                    messageText={msg.text}
                    timestamp={msg.timestamp}
                    userProfilePicture={msg.photoURL}
                    sent={msg.senderId === user.uid}
                  />
                );
              })}
          </div>
          <div className="chat-input" id="chat-input">
            <InputBase
              id="chatInput"
              className="chat-input-field"
              placeholder="Aa"
              label="chat-input"
              onChange={this.handleChange}
              value={this.state.input}
              onKeyDown={this.handleKeyDown}
              multiline={true}
            />
            <Button
              variant="text"
              borderRadius={0}
              label="submit"
              color="var(--color-primary)"
              fontSize="1rem"
              padding="0.015rem 0.5rem"
              handleClick={() => this.submitClick()}
            />
            <div
              style={{
                display: "flex",
                cursor: "pointer",
                alignItems: "center"
              }}
              onClick={() => {
                this.setState({ showEmojiKeyboard: true });
              }}
            >
              <InsertEmoji color="var(--color-dark)" />
            </div>
          </div>
          {showEmojiKeyboard && (
            <EmojiSelector
              onSelect={this.addEmoji}
              toggleEmojiKeyboard={this.closeEmojiKeyboard}
            />
          )}
        </div>
      </Paper>
    );
  }
}

export default ChatWindow;
