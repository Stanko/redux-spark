import { all } from 'redux-saga/effects';
import spark from '../spark';


export default function* rootSaga() {
  yield all([
    ...spark.getAllSagas(),
  ]);
}