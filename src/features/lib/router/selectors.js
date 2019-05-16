import { createSelector } from "reselect";

export const getPathname = ({ router }) => router.location.pathname;
export const getSearch = ({ router }) => router.location.search;

const getPathhameState = () =>
  createSelector([getPathname], pathname => pathname);

export default { getPathhameState };
