import { createSelector } from "reselect";

export const getPathname = ({ router }) => router.location.pathname;

const getPathhameState = () =>
  createSelector([getPathname], pathname => pathname);

export default { getPathhameState };
