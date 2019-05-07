import React, { Component } from "react";
import { actions } from "../../lib/chat";
import { getUser } from "../../lib/authentication/selectors";
import { connect } from "react-redux";

const { sendChatMessage, loadChat } = actions;

function  dateString(date) {
  // Datetime function goes here
}

class Chat extends Component {
  componentDidMount() {
    this.props.handleChatSend(0, {uid: 0}, "#VÅTA DJUR");
    this.props.handleChatLoad(0);
  }

  render() {

    return this.props.messages.map((msg) => {
      return <p> {msg.sender}: "{msg.text}" at {dateString(msg.timestamp)} </p>;
    });
  }
}





const mapDispatchToProps = dispatch => ({
  handleChatSend: ( id, user, message ) => dispatch(sendChatMessage( id, user, message )),
  handleChatLoad: ( id ) => dispatch(loadChat( id ))
});

const mapStateToProps = (state) => {
  const { chat } = state
  return { messages: chat.messages }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
