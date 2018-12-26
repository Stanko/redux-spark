import { takeEvery } from 'redux-saga/effects';
import createSaga from './create-saga';

describe('Create saga', () => {
  test('is instantiated', () => {
    const actionTypes = {
      error: 'ERROR',
      start: 'START',
      success: 'SUCCESS',
    };
    expect(createSaga(() => {/* MOCKED */}, actionTypes)).toBeDefined();
    expect(createSaga(() => {/* MOCKED */}, actionTypes, takeEvery)).toBeDefined();
  });

  test('should return saga function', () => {
    const actionTypes = {
      error: 'ERROR',
      start: 'START',
      success: 'SUCCESS',
    };

    const saga = createSaga(() => {
      return new Promise(resolve => resolve({ users: [] }));
    }, actionTypes);
    expect(typeof saga).toEqual('function');
  });
});
