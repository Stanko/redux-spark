import core from './core';

const camel2const = (camelCase:string):string => {
  return camelCase
    .replace(/([A-Z])/g, match => `_${match}`)
    .toUpperCase();
};

// Action handler function
type TActionHandler = (state:any, action:object) => any;

// Action handlers map
interface IActionHandlerMap { 
  [key:string]: TActionHandler
};

// Async action handlers map 
interface IAsyncActionHandlerMap { 
  start: TActionHandler,
  error: TActionHandler,
  success: TActionHandler,
};

export default class Reducer {
  private name:string;
  private actionHandlers:IActionHandlerMap = {};
  private actionCreators:any = {};
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

  // -------- PUBLIC API

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
   * @param promise - async promise which will used in saga.
   * @param handlers - map with start/error/success handler functions.
   */
  public addAsyncAction(actionName:string, promise:any, handlers:IAsyncActionHandlerMap) {
    // TODO 
    // create and register saga
    // handle promise
    // allow user to specify saga effect (default "takeLatest")
    const actionTypeBody = camel2const(actionName);
    const actions = ['start', 'error', 'success'];

    const actionTypes = {
      error: `${ actionTypeBody }_ERROR`,
      start: `${ actionTypeBody }_START`,
      success: `${ actionTypeBody }_SUCCESS`,
    }

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
    const actionCreators = {};
    Object.keys(this.actionHandlers).forEach(actionType => {
      const actionCreatorName = this.actionHandlers[actionType].name;

      actionCreators[actionCreatorName] = (...params:any[]) => ({
        type: actionType,
        ...params,
      });
    });
  }

  // -------- PUBLIC METHODS 
  // -------- Used by the Core

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
   * Returns reducer's name.
   * 
   * @return Reducer's name.
   */
  public getName():string {
    return this.name;
  }


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