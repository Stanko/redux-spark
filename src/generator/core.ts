import Reducer from './reducer';

interface IReducerMap { 
  [key:string]: Reducer,
};

class Core {
  private reducers:IReducerMap = {};
  private sagas:any = {};

  // -------- PUBLIC API

  /**
   * Save reducer internally. 
   * Called by the reducer itself when it is created.
   *
   * @param reducerName - reducer's name.
   * @param reducer - reducer to be registered.
   */
  public registerReducer(reducerName:string, reducer:Reducer) {
    this.reducers[reducerName] = reducer;
  }

  /**
   * Returns all of the registered reducers, 
   * so they can be used in redux's combineReducers method.
   *
   * @return Map of all registered reducers.
   */
  public getAllReducers():object {
    return Object.keys(this.reducers).map(reducerName => 
      this.reducers[reducerName].getReducerFunction()
    );
  }

  /**
   * Returns all of the generated sagas, 
   * so they can be run using saga middleware.
   *
   * @return Array of all generated sagas.
   */
  public getAllSagas() {
    return this.sagas;
  }

  // -------- PRIVATE METHODS
}

export default new Core();
