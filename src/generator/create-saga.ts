import { call, put, takeLatest } from 'redux-saga/effects';

export interface IAsyncActionTypesMaps { 
  start: string,
  error: string,
  success: string,
};


const createSaga = (asyncMethod:any, actionTypes:IAsyncActionTypesMaps, effect:any = takeLatest) => {
  function* getData(action:object) {
    try {
      const data = yield call(() => asyncMethod(action));
      yield put({ 
        action,
        data, 
        type: actionTypes.success, 
      });
    } catch (error) {
      yield put({ 
        action,
        error, 
        type: actionTypes.error,
      });
    }
  }
  
  return function* watchGetData() {
    yield effect(actionTypes.start, getData);
  }
}

export default createSaga;