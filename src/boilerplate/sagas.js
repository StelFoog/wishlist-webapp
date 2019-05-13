// Sagas handle side-effects to actions, this will in most cases be getting data
// and then getting a reducer to att it to the store.
// Important: Remember to add the sagas to rootSaga or they won't be able to
// find the actions.

import { takeEvery, put } from "redux-saga/effects";
import types from "./types";

const { BOILER_THING, BOILER_THING_SUCCESS, BOILER_THING_ERROR } = types;

function* watchBoilerThing() {
  yield takeEvery(BOILER_THING, workBoilerThing);
}

function* workBoilerThing({ payload, thing }) {
  try {
    // Do something.
    yield put({ type: BOILER_THING_SUCCESS, result: { ...payload, ...thing } });
  } catch (error) {
    yield put({ type: BOILER_THING_ERROR });
  }
}

export default {
  watchBoilerThing
};
