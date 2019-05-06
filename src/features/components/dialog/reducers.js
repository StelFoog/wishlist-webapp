import types from "./types";

const { OPEN_DIALOG, CLOSE_DIALOG } = types;

const initialState = {
  showDialog: false,
  variant: ""
};

const dialogReducer = (state = initialState, action) => {
  const { type, variant } = action;
  let newState = state;
  switch (type) {
    case OPEN_DIALOG:
      newState.showDialog = true;
      newState.variant = variant;
      return { ...newState };
    case CLOSE_DIALOG:
      newState.showDialog = false;
      return { ...newState };
    default:
      return { ...newState };
  }
};

export default { dialogReducer };
