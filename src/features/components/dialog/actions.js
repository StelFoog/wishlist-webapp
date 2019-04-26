import types from "./types";

const { OPEN_DIALOG, CLOSE_DIALOG } = types;

const openDialog = content => ({
  type: OPEN_DIALOG,
  content: content
});

const closeDialog = () => ({
  type: CLOSE_DIALOG
});

export default {
  openDialog,
  closeDialog
};
