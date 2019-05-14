import types from "./types.js";

const {
  CREATE_CHAT,
  LOAD_CHAT,
  SEND_CHAT_MESSAGE,
  LOAD_CHAT_SUCCESS,
  DELETE_CHAT
} = types;

const createChat = id => ({
  type: CREATE_CHAT,
  id
});

const loadChat = id => ({
  type: LOAD_CHAT,
  id
});

const sendChatMessage = (id, message) => ({
  type: SEND_CHAT_MESSAGE,
  id,
  message
});

const updateLocalChat = chat => ({
  // TODO: Descriptive action name
  type: LOAD_CHAT_SUCCESS,
  messages: chat.messages
});

const deleteChat = uid => ({
  type: DELETE_CHAT,
  uid
});

export default {
  createChat,
  loadChat,
  sendChatMessage,
  updateLocalChat,
  deleteChat
};
