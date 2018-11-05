import core from './core';
import createSaga from './create-saga';

const camel2const = (camelCase:string):string => {
  return camelCase
    .replace(/([A-Z])/g, match => `_${match}`)
    .toUpperCase();
};

// Action handler function
type TActionHandler = (state:any, action:object) => any;

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

// Action creator function
type TActionCreator = (...param:any) => object;

// Action creators map
interface IActionCreatorsMap { 
  [key:string]: TActionCreator
};

export default class Reducer {
  private name:string;
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
    this.name = name;
    this.initialState = initialState;

    core.registerReducer(this.name, this);
  }

  // -------- PUBLIC INTERFACE

  /**
   * Adds synchronous action.
   * Generates action type and action creator.
   * 
   * @param actionName - action name, it will be used for generating action type and as action creator name.
   * @param handler - handler function.
   */
  public addAction(actionName:string, handler:TActionHandler) {
    const actionType = camel2const(actionName);
    this.actionHandlers[actionType] = handler;
    
    this.addActionCreator(actionName, actionType);
  }

  /**
   * Adds asynchronous action with three states start/error/success.
   * Generates action types, action creators and sagas.
   * 
   * @param actionName - action name, it will be used for generating action type and as action creator name.
   * @param asyncMethod - async function which will used in saga (returns promise).
   * @param handlers - map with start/error/success handler functions.
   */
  public addAsyncAction(actionName:string, asyncMethod:any, handlers:IAsyncActionHandlerMap) {
    // TODO 
    // create and register saga
    // handle asyncMethod
    // allow user to specify saga effect (default "takeLatest")
    const actionTypeBody = camel2const(actionName);
    const actions = ['start', 'error', 'success'];

    const actionTypes = {
      error: `${ actionTypeBody }_ERROR`,
      start: `${ actionTypeBody }_START`,
      success: `${ actionTypeBody }_SUCCESS`,
    }

    // Create saga
    const saga = createSaga(asyncMethod, actionTypes);
    this.sagas.push(saga);

    this.addActionCreator(actionName, actionTypes.start);
    
    actions.forEach((currentActionName:string) => {
      const actionType = actionTypes[currentActionName];

      this.actionHandlers[actionType] = handlers[currentActionName];
    });
  }

  /**
   * Gets all of the generated action creators
   * 
   * @return Map of reducer's action creators.
   */
  public getActionCreators():any {
    return this.actionCreators;
  }

  // -------- PUBLIC METHODS 
  // -------- For internal use only

  /**
   * Caution! Intended for internal use only.
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
   * Caution! Intended for internal use only.
   * Gets all of the generated sagas.
   * 
   * @return Array of all generated sagas.
   */
  public getSagas():any[] {
    return this.sagas;
  }

  /**
   * Caution! Intended for internal use only (testing).
   * Gets map of action handlers
   * 
   * @return Map of action handlers.
   */
  public getActionHandlers() {
    return this.actionHandlers;
  }

  // TODO check if we need this
  /**
   * Returns reducer's name.
   * 
   * @return Reducer's name.
   */
  // public getName():string {
  //   return this.name;
  // }


  // -------- PRIVATE METHODS

  /**
   * Based on the action name and action creates generic action creator function,
   * and registers it internally.
   *
   * @param actionName - Action name (ie. getUsers)
   * @param actionType - Action type (ie. GET_USERS)
   */
  private addActionCreator(actionName:string, actionType:string) {
    this.actionCreators[actionName] = (...params:any[]) => ({
      type: actionType,
      ...params,
    });
  }
}