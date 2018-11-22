import { all } from 'redux-saga/effects';
import core from '../generator/core';


export default function* rootSaga() {
  yield all([
    ...core.getAllSagas(),
  ]);
}