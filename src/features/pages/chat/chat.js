import React, { Component } from "react";
import { getUser } from "../../lib/authentication/selectors";
import { connect } from "react-redux";
import { onChatMessageReceived } from "../../lib/chat/db.js";
import Button from "../../components/button";
import { actions } from "../../lib/chat";
const { sendChatMessage, updateLocalChat, createChat } = actions;

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

const formatTimestamp = timestamp => {
  let time = new Date(0);
  time.setUTCSeconds(timestamp.seconds);
  return (
    time.getHours() +
    ":" +
    time.getMinutes() +
    ", " +
    time.getFullYear() +
    "/" +
    (time.getMonth() + 1) +
    "/" +
    time.getDate()
  );
};

class Chat extends Component {
  componentDidMount() {
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
    return (
      <div>
        <React.Fragment>
          {this.props.messages.map(msg => (
            <p>
              {msg.senderName}: "{msg.text}" at {formatTimestamp(msg.timestamp)}
            </p>
          ))}
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
        </React.Fragment>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleChatSend: (id, user, message) =>
    dispatch(sendChatMessage(id, user, message)),
  handleChatUpdate: messages => dispatch(updateLocalChat(messages)),
  handleCreateChat: user => dispatch(createChat(user))
});

const mapStateToProps = state => {
  const { chat } = state;
  return { messages: chat.messages };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
