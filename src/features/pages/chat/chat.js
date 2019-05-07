import React, { Component } from "react";
import { actions } from "../../lib/chat";
import { getUser } from "../../lib/authentication/selectors";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

const { sendChatMessage, loadChat } = actions;

function timestampString(date) {
  return date;
}

class Chat extends Component {
  componentDidMount() {
    this.props.handleChatSend(0, {uid: 0}, "#VÅTA DJUR");
    this.props.handleChatLoad(0);
  }

  render() {

    return 
      <div>
      {
        this.props.messages.map((msg) => {
          return <p> {msg.sender}: "{msg.text}" at 
            {timestampString(msg.timestamp)} </p>;
        }
      }
      <form onSubmit={submitMessage}>
        <div>
          
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
