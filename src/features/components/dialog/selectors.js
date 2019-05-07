import { createSelector } from "reselect";

const getDialogOpened = ({ dialog }) => dialog.showDialog;
const getDialogVariant = ({ dialog }) => dialog.variant;
export const getDialogValues = ({ dialog }) => dialog.values;

const getDialogOpenedState = () =>
  createSelector([getDialogOpened], dialogOpened => dialogOpened);

const getDialogVariantState = () =>
  createSelector([getDialogVariant], dialogVariant => dialogVariant);

const getDialogValuesState = () =>
  createSelector([getDialogValues], dialogValues => dialogValues);

export default { getDialogOpenedState, getDialogVariantState, getDialogValuesState };
