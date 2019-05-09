//

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
