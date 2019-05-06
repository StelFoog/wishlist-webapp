import types from "./types.js";

const {
  CREATE_CHAT,
  LOAD_CHAT,
  SEND_CHAT_MESSAGE
} = types;

const createChat = (id) => ({
  type: CREATE_CHAT,
  id
});

const loadChat = (id) => ({
  type: LOAD_CHAT,
  id
});

const sendChatMessage = (id, user, message) => ({
  type: SEND_CHAT_MESSAGE,
  id,
  user,
  message
});

export default {
  createChat,
  loadChat,
  sendChatMessage
};
