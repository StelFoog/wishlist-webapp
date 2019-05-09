import ChatWindow from "./ChatWindow";
import { connect } from "react-redux";
import { actions } from "../../../../lib/chat";

const { sendChatMessage, updateLocalChat, createChat } = actions;

const mapStateToProps = state => {
  const { chat } = state;
  return { messages: chat.messages };
};

const mapDispatchToProps = dispatch => ({
  handleChatSend: (id, user, message) =>
    dispatch(sendChatMessage(id, user, message)),
  handleChatUpdate: messages => dispatch(updateLocalChat(messages)),
  handleCreateChat: user => dispatch(createChat(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWindow);
