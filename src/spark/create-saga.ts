import { call, put, takeLatest } from 'redux-saga/effects';

import { IAction } from './reducer';

export interface IAsyncActionTypesMap {
  start: string,
  error: string,
  success: string,
};

const createSaga = (asyncMethod:any, actionTypes:IAsyncActionTypesMap, effect:any = takeLatest) => {
  function* getData(action:IAction) {
    const { type, ...params } = action;

    try {
      const data = yield call(() => asyncMethod(params));

      yield put({
        data,
        params,
        type: actionTypes.success,
      });
    } catch (error) {
      yield put({
        error,
        params,
        type: actionTypes.error,
      });
    }
  }

  return function* watchGetData() {
    yield effect(actionTypes.start, getData);
  }
}

export default createSaga;
