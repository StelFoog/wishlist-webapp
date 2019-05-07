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
  let nextState = {...state};
  const { type, messages, error } = action;

  switch (type) {
    case CREATE_CHAT_ERROR:
      console.error("(REDUX)chat creation error: " + error.code + "-> " + error.message);
      return { ...nextState };
    case CREATE_CHAT_SUCCESS:
      console.log("(REDUX)Chat created successfully #VåtaDjur"); //TODO: Remove debug logging
      return { ...nextState };

    case LOAD_CHAT_ERROR:
      console.error("(REDUX)chat loading error: " + error.code + "-> " + error.message);
      return { ...nextState };
    case LOAD_CHAT_SUCCESS:
      nextState.messages = messages;
      console.log("(REDUX)Chat loaded successfully: " + messages[0].text + " #VåtaDjur"); //TODO: Remove debug logging
      return { ...nextState };

    case SEND_CHAT_MESSAGE_ERROR:
      console.error("(REDUX)chat message sending error: " + error.code + "-> " + error.message);
      return { ...nextState };
    case SEND_CHAT_MESSAGE_SUCCESS:
      nextState.messages.push(messages);
      console.log("(REDUX)Chat message sent: " + messages.text + " #VåtaDjur"); //TODO: Remove debug logging
      return { ...nextState };
    default:
      return { ...nextState };
  }
};

export default { chatReducer };
