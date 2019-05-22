import { createSelector } from "reselect";

export const getUsers = ({ users }) => users.users;

const getUsersState = () =>
  createSelector(
    [getUsers],
    users => users
  );

const selectUserCache = getUsers;

export default { getUsersState };

export { selectUserCache }
