import types from "./types";

const { OPEN_DIALOG, CLOSE_DIALOG } = types;

const openDialog = variant => ({
  type: OPEN_DIALOG,
  variant
});

const closeDialog = () => ({
  type: CLOSE_DIALOG
});

export default {
  openDialog,
  closeDialog
};
