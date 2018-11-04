import core from './core';

const camel2const = (camelCase:string):string => {
  return camelCase
    .replace(/([A-Z])/g, match => `_${match}`)
    .toUpperCase();
};

const capitalize = (str:string):string => {
  return `${ str.charAt(0).toUpperCase() }${ str.slice(1) }`;
}

type TActionHandler = (state:any, action:object) => any;

interface IActionHandlerMap { 
  [key:string]: TActionHandler
};

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

  constructor(name:string, initialState:any = {}, actionHandlers:IActionHandlerMap = {}) {
    this.name = name;
    this.actionHandlers = actionHandlers;
    this.initialState = initialState;

    core.registerReducer(this.name, this);
  }

  // -------- PUBLIC API

  public addAction(actionName:string, handler:TActionHandler) {
    const actionType = camel2const(actionName);
    this.actionHandlers[actionType] = handler;
    
    this.addActionCreator(actionName, actionType);
  }

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
  // -------- Used by the Core.ts

  public getReducerFunction() {
    return (state:any = this.initialState, action:any = {}) => {
      const actionHandler = this.actionHandlers[action.type];
      return actionHandler ? actionHandler.handler(state, action) : state;
    }
  }

  public getName():string {
    return this.name;
  }

  

  // -------- PRIVATE METHODS

  private addActionCreator(actionName:string, actionType:string) {
    this.actionCreators[actionName] = (...params:any[]) => ({
      type: actionType,
      ...params,
    });
  }
}