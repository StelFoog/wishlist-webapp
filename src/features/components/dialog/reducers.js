import types from "./types";

const { OPEN_DIALOG, CLOSE_DIALOG } = types;

const initialState = {
  showDialog: false,
  content: null
};

const dialogReducer = (state = initialState, action) => {
  const { type, content } = action;
  let newState = state;
  switch (type) {
    case OPEN_DIALOG:
      newState.showDialog = true;
      newState.content = content;
      return { ...newState };
    case CLOSE_DIALOG:
      newState.showDialog = false;
      return { ...newState };
    default:
      return { ...newState };
  }
};

export default { dialogReducer };
