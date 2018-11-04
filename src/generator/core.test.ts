import core from './core';
import Reducer from './reducer';

describe('Core', () => {
	test('is instantiated', () => {
		expect(core).toBeDefined();
	});

	test('should be able to get created reducers', () => {
    const usersReducer = new Reducer('users', {});
    const settingsReducer = new Reducer('settings', {});
        
    const reducers:any = core.getAllReducers();

    expect(typeof reducers).toEqual('object');
    expect(Object.keys(reducers).length).toBe(2);
    expect(typeof reducers.users).toEqual('function');
    expect(typeof reducers.settings).toEqual('function');
	});
});
