import React, { Component } from "react";
import { actions } from "../../lib/chat";
import { getUser } from "../../lib/authentication/selectors";
import { connect } from "react-redux";
import { onChatMessageReceived } from "../../lib/chat/db.js";
import Button from "../../components/button";

const { sendChatMessage, loadChat, freebaseFuckeries } = actions;

function timestampString(date) {
  let d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(date.seconds);
  return d.getDate().toString() + "-" + d.getHours().toString() + "-" + d.getMinutes().toString() + "-" + d.getSeconds().toString();
}

const chatClick = (props) => {
  return () => {
    // 100% pure and native solution
    const elem = document.getElementById("chatInput");
    const text = elem.value;
    elem.value = "";
    props.handleChatSend( 0, text);
  };
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
            <p> {msg.sender}: "{msg.text}" at {timestampString(msg.timestamp)} </p>
          )}
          <input type="text" id="chatInput" />
          <Button
            handleClick={chatClick(this.props)}
            label="Send message"
            variant="filled"
            color="#73359B"
          />
        </React.Fragment>
      </div>
    )

  }
}





const mapDispatchToProps = dispatch => ({
  handleChatSend: ( id, message ) => dispatch(sendChatMessage( id, message )),
  handleChatLoad: ( id ) => dispatch(loadChat( id )),
  handleChatUpdate: (messages) => dispatch(freebaseFuckeries( messages ))
});

const mapStateToProps = (state) => {
  const { chat } = state
  return { messages: chat.messages }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
