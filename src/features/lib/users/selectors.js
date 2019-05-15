import { createSelector } from "reselect";

export const getUsers = ({ users }) => users.users;

const getUsersState = () =>
  createSelector(
    [getUsers],
    users => users
  );

export default { getUsersState };
