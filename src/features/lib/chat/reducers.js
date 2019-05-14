import types from "./types.js";

const {
  CREATE_CHAT_ERROR,
  CREATE_CHAT_SUCCESS,
  LOAD_CHAT_ERROR,
  LOAD_CHAT_SUCCESS,
  SEND_CHAT_MESSAGE_ERROR,
  SEND_CHAT_MESSAGE_SUCCESS,
  DELETE_CHAT_ERROR,
  DELETE_CHAT_SUCCESS
} = types;

const initialState = {
  messages: []
};

const chatReducer = (state = initialState, action) => {
  let nextState = { ...state };
  const { type, messages, error } = action;

  switch (type) {
    case CREATE_CHAT_ERROR:
      console.error(
        "(REDUX)chat creation error: " + error.code + "-> " + error.message
      );
      return { ...nextState };

    case CREATE_CHAT_SUCCESS:
      return { ...nextState };

    case LOAD_CHAT_ERROR:
      console.error(
        "(REDUX)chat loading error: " + error.code + "-> " + error.message
      );
      return { ...nextState };

    case LOAD_CHAT_SUCCESS:
      nextState.messages = messages;
      return { ...nextState };

    case SEND_CHAT_MESSAGE_ERROR:
      console.error(
        "(REDUX)chat message sending error: " +
          error.code +
          "-> " +
          error.message
      );
      return { ...nextState };

    case SEND_CHAT_MESSAGE_SUCCESS:
      // No nees to push to state since client listens to and fetches DB changes anyway
      return { ...nextState };

    case DELETE_CHAT_SUCCESS:
      nextState.messages = [];
      return { ...nextState };

    case DELETE_CHAT_ERROR:
      console.error(
        "Chat deleting error: " + error.code + "-> " + error.message
      );
      return { ...nextState };

    default:
      return { ...nextState };
  }
};

export default { chatReducer };
