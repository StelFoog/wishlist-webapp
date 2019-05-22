import { takeLeading, put, all } from "redux-saga/effects";
import { types as authTypes } from "../authentication";
import { types as chatTypes } from "../chat";
import { types as groupItemTypes } from "../groupItems";
import { types as groupTypes } from "../groups";
import { types as miscTypes } from "../misc";
import { types as usersTypes } from "../users";
import { types as wishlistItemsTypes } from "../wishlistItems";
import { types as wishlistTypes } from "../wishlists";
import dialogActions from "../../components/dialog/actions.js";

const { openDialog } = dialogActions;

const errorTypes = types =>
  Object.values(types).filter(literal => literal.endsWith("ERROR"));

const watchedTypes = errorTypes(authTypes)
  .concat(errorTypes(chatTypes))
  .concat(errorTypes(groupItemTypes))
  .concat(errorTypes(groupTypes))
  .concat(errorTypes(miscTypes))
  .concat(errorTypes(usersTypes))
  .concat(errorTypes(wishlistItemsTypes))
  .concat(errorTypes(wishlistTypes));

function* watchError() {
  yield all(watchedTypes.map(type => takeLeading(type, workError)));
}

function* workError(action) {
  const { type, error } = action;
  yield put(openDialog("error", { type: type, error: error }));
}

export default { watchError };
