import types from "./types.js";

const {
  CREATE_CHAT_ERROR,
  CREATE_CHAT_SUCCESS,
  LOAD_CHAT_ERROR,
  LOAD_CHAT_SUCCESS,
  SEND_CHAT_MESSAGE_ERROR,
  SEND_CHAT_MESSAGE_SUCCESS
} = types;

const initialState = {
  messages: []
};

const chatReducer = (state = initialState, action) => {
  let nextState = state;
  const { type, id, error, messages } = action;

  switch (type) {
    case CREATE_CHAT_ERROR:
      console.error("chat creation error: " + error.code + "-> " + error.message);
      return { ...nextState };
    case CREATE_CHAT_SUCCESS:
      console.log("Chat created successfully #VåtaDjur"); //TODO: Remove debug logging
      return { ...nextState };

    case LOAD_CHAT_ERROR:
      console.error("chat loading error: " + error.code + "-> " + error.message);
      return { ...nextState };
    case LOAD_CHAT_SUCCESS:
      nextState.chat = messages;
      console.log("Chat loaded successfully #VåtaDjur"); //TODO: Remove debug logging
      return { ...nextState };

    case SEND_CHAT_MESSAGE_ERROR:
      console.error("chat message sending error: " + error.code + "-> " + error.message);
      return { ...nextState };
    case SEND_CHAT_MESSAGE_SUCCESS:
      nextState.chat.push(messages);
      console.log("Chat message sent: " + messages + " #VåtaDjur"); //TODO: Remove debug logging
      return { ...nextState };
    default:
      return { ...nextState };
  }
};

export default { chatReducer };
