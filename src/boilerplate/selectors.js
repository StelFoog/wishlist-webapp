import { createSelector } from "reselect";

const getFoo = ({ bolier }) => boiler.foo;
// Sagas doesn't use createSelector to get things from the state, so if they
// need something from the state they just use the get* getter-function;
export const getBar = ({ bolier }) => bolier.bar;

const getFooState = () => createSelector([getFoo], foo => foo);
const getBarState = () => createSelector([getBar], bar => bar);

export default {
  getFooState,
  getBarState
};
