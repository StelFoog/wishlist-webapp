import { createSelector } from "reselect";

export const getGroups = ({ group }) => group.groups;

const getGroupsState = () =>
  createSelector(
    [getGroups],
    groups => groups
  );

export default { getGroupsState };
