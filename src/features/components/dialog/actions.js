import types from "./types";

const { OPEN_DIALOG, CLOSE_DIALOG } = types;

const openDialog = (variant, values = null) => ({
  type: OPEN_DIALOG,
  variant,
  values
});

const closeDialog = () => ({
  type: CLOSE_DIALOG
});

export default {
  openDialog,
  closeDialog
};
