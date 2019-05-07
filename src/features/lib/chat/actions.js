import types from "./types.js";

const {
  CREATE_CHAT,
  LOAD_CHAT,
  SEND_CHAT_MESSAGE,
  LOAD_CHAT_SUCCESS
} = types;

const createChat = (id) => ({
  type: CREATE_CHAT,
  id
});

const loadChat = (id) => ({
  type: LOAD_CHAT,
  id
});

const sendChatMessage = (id, message) => ({
  type: SEND_CHAT_MESSAGE,
  id,
  message
});

const updateLocalChat = (chat) => ({ // TODO: Descriptive action name
  type: LOAD_CHAT_SUCCESS,
  messages: chat.messages
});

export default {
  createChat,
  loadChat,
  sendChatMessage,
  updateLocalChat
};
