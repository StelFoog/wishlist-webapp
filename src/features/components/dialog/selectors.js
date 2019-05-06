import { createSelector } from "reselect";

const getDialogOpened = ({ dialog }) => dialog.showDialog;
const getDialogVariant = ({ dialog }) => dialog.variant;

const getDialogOpenedState = () =>
  createSelector([getDialogOpened], dialogOpened => dialogOpened);

const getDialogVariantState = () =>
  createSelector([getDialogVariant], dialogVariant => dialogVariant);

export default { getDialogOpenedState, getDialogVariantState };
