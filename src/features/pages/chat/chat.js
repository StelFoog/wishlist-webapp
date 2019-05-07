import React, { Component } from "react";
import { actions } from "../../lib/chat";
import { getUser } from "../../lib/authentication/selectors";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import Button from "../../components/button";

const { sendChatMessage, loadChat } = actions;

function timestampString(date) {
  return date;
}

const chatClick = (_this) => {
  return () => {
    _this.props.handleChatSend( 0, {uid: 0}, "SILLIZ");
    //_this.props.handleChatLoad(0);
  };
}

class Chat extends Component {
  componentDidMount() {
    //this.props.handleChatSend(0, {uid: 0}, "#VÅTA DJUR");
    this.props.handleChatLoad(0);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.messages.map((msg) =>
          <p> {msg.sender}: "{msg.text}" at {dateString(msg.timestamp)} </p>
        )}
        <Button
          handleClick={chatClick(this)}
          label="Send message"
          variant="filled"
          color="#73359B"
        />
      </React.Fragment>
    )

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
