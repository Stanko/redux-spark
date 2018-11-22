import { takeLatest } from 'redux-saga/effects';

import core from './core';
import createSaga from './create-saga';
import { camel2const } from './utils';

// Action handler function
type TActionHandler = (state:any, action:object) => any;

// Object
interface IObject { 
  [key:string]: any
};

// Action handlers map
interface IActionHandlersMap { 
  [key:string]: TActionHandler
};

// Async action handlers map 
interface IAsyncActionHandlerMap { 
  start: TActionHandler,
  error: TActionHandler,
  success: TActionHandler,
};

// Action
export interface IAction { 
  type:string
  [key:string]: any
};

// Action creator function
type TActionCreator = (...param:any) => IAction;

// Action creators map
interface IActionCreatorsMap { 
  [key:string]: TActionCreator
};

// Custom saga options object
interface ISagaOptions { 
  saga?: any,
  effect?: any,
};

export default class Reducer {
  private actionHandlers:IActionHandlersMap = {};
  private actionCreators:IActionCreatorsMap = {};
  private sagas:any[] = [];
  private initialState:any;

  /**
   * Creates Reducer class and registers it in the Core.
   * 
   * @param name - name of the reducer.
   * @param initialState - reducer's initial state.
   */
  constructor(name:string, initialState:any = {}) {
    this.initialState = initialState;

    core.registerReducer(name, this);
  }

  // -------- PUBLIC INTERFACE

  /**
   * Adds synchronous action.
   * Generates action type and action creator.
   * 
   * @param actionName - action name, it will be used for generating action type and as action creator name.
   * @param handler - handler function.
   * 
   * @return Action creator function.
   */
  public addAction(actionName:string, handler:TActionHandler):TActionCreator {
    const actionType = camel2const(actionName);
    this.actionHandlers[actionType] = handler;
    
    return this.addActionCreator(actionName, actionType);
  }

  /**
   * Adds asynchronous action with three states start/error/success.
   * Generates action types, action creators and sagas.
   * 
   * @param actionName - action name, it will be used for generating action type and as action creator name.
   * @param asyncMethod - async function which will used in saga (has to return promise).
   * @param handlers - map with start/error/success handler functions.
   * @param effect - custom saga effect, default: takeLatest
   * 
   * @return Action creator function.
   */
  public addAsyncAction(
    actionName:string, 
    asyncMethod:any, 
    handlers:IAsyncActionHandlerMap,
    sagaOptions:ISagaOptions = {},
  ):TActionCreator {
    const actionTypeBody = camel2const(actionName);
    const actions = ['start', 'error', 'success'];

    const actionTypes = {
      start: `${ actionTypeBody }_START`,
      error: `${ actionTypeBody }_ERROR`,
      success: `${ actionTypeBody }_SUCCESS`,
    }

    const saga = sagaOptions.saga ?
      // User defined saga
      sagaOptions.saga :
      // Create saga if user didn't pass it
      createSaga(asyncMethod, actionTypes, sagaOptions.effect || takeLatest);

    this.sagas.push(saga);

    // Action creator
    const actionCreator = this.addActionCreator(actionName, actionTypes.start);
    
    // Action types
    // [ACTION_NAME]_START
    // [ACTION_NAME]_ERROR
    // [ACTION_NAME]_SUCCESS
    actions.forEach((currentActionName:string) => {
      const actionType = actionTypes[currentActionName];

      this.actionHandlers[actionType] = handlers[currentActionName];
    });

    return actionCreator;
  }

  // -------- PUBLIC METHODS 
  // -------- INTENDED FOR INTERNAL USE ONLY

  /**
   * CAUTION! Intended for internal use only.
   * Returns reducer function.
   * 
   * @return Reducer function with using handlers map.
   */
  public getReducerFunction() {
    return (state:any = this.initialState, action:any = {}) => {
      const actionHandler = this.actionHandlers[action.type];
      return actionHandler ? actionHandler(state, action) : state;
    }
  }

  /**
   * CAUTION! Intended for internal use only.
   * Gets all of the generated sagas.
   * 
   * @return Array of all generated sagas.
   */
  public getSagas():any[] {
    return this.sagas;
  }

  /**
   * CAUTION! Intended for internal use only (testing).
   * Gets map of action handlers
   * 
   * @return Map of action handlers.
   */
  public getActionHandlers() {
    return this.actionHandlers;
  }


  // -------- PRIVATE METHODS

  /**
   * Based on the action name and action creates generic action creator function,
   * and registers it internally.
   *
   * @param actionName - Action name (ie. getUsers)
   * @param actionType - Action type (ie. GET_USERS)
   * 
   * @return Action creator function.
   */
  private addActionCreator(actionName:string, actionType:string):TActionCreator {
    const actionCreator = (params:IObject) => ({
      type: actionType,
      params,
    });

    this.actionCreators[actionName] = actionCreator;

    return actionCreator;
  }
}