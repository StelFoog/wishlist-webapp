import { createSelector } from "reselect";

const getDialogOpened = ({ dialog }) => dialog.showDialog;
const getDialogContent = ({ dialog }) => dialog.content;

const getDialogOpenedState = () =>
  createSelector(
    [getDialogOpened],
    dialogOpened => dialogOpened
  );

const getDialogContentState = () =>
  createSelector(
    [getDialogContent],
    dialogContent => dialogContent
  );

export default { getDialogOpenedState, getDialogContentState };
