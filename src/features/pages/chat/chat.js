import React, { Component } from "react";
import { actions } from "../../lib/chat";
import { getUser } from "../../lib/authentication/selectors";
import { connect } from "react-redux";
import { onChatMessageReceived } from "../../lib/chat/db.js";
import Button from "../../components/button";
const { sendChatMessage, updateLocalChat, createChat } = actions;

const chatClick = (props) => {
  return () => {
    const elem = document.getElementById("chatInput");
    const text = elem.value;
    elem.value = "";
    props.handleChatSend( 0, text);
  };
}

const createChatClick = (props) => {
  return () => {
    
  }
}

class Chat extends Component {
  componentDidMount() {
    //this.props.handleChatSend(0, {uid: 0}, "#VÅTA DJUR");
    this.props.handleChatLoad(0);
    onChatMessageReceived(0, ((props) => {
      return (chat) => {
        console.log("Triple lambda says: ");
        console.log(chat);
        props.handleChatUpdate(chat);
      }
    })(this.props));
  }

  render() {
    return (
     <div>
        <React.Fragment>
          {this.props.messages.map((msg) =>
            <p> {msg.senderName}: "{msg.text}" at {timestampString(msg.timestamp)} </p>
          )}
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
            color="#439812"
          />
        </React.Fragment>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  handleChatSend: (id, user, message) => 
    dispatch(sendChatMessage(id, user, message)),
  handleChatUpdate: (messages) => 
    dispatch(updateLocalChat(messages)),
  handleCreateChat: (user) => 
    dispatch(createChat(user))
});

const mapStateToProps = (state) => {
  const { chat } = state
  return { messages: chat.messages }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
