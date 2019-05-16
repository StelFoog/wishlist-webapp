import { createSelector } from "reselect";

export const getUser = ({ auth }) => auth.user;

const getCurrentUserState = () =>
  createSelector(
    [getUser],
    currentUser => currentUser
  );

export default { getCurrentUserState };
