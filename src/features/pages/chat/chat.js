import React, { Component } from "react";
import { actions } from "../../lib/chat";
import { getUser } from "../../lib/authentication/selectors";
import { connect } from "react-redux";

const { sendChatMessage, loadChat } = actions;

class Chat extends Component {
  componentDidMount() {
    this.props.handleChatSend(0, {uid: 0}, "#VÅTA DJUR");
    this.props.handleChatLoad(0);
  }

  render() {
    return(
      <p> HEJ JAG ÄR RÖD </p>
    );
  }
}





const mapDispatchToProps = dispatch => ({
  handleChatSend: ( id, user, message ) => dispatch(sendChatMessage( id, user, message )),
  handleChatLoad: ( id ) => dispatch(loadChat( id ))
});

export default connect(
  null,
  mapDispatchToProps
)(Chat);
