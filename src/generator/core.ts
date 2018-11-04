import Reducer from './reducer';

interface IReducerMap { 
  [key:string]: Reducer,
};

class Core {
  private reducers:IReducerMap;
  private sagas:any[];

  // -------- PUBLIC API

  /**
   * Save reducer internally
   *
   * @param reducerName - reducer's name
   * @param reducer - reducer to be registered.
   */
  public registerReducer(reducerName:string, reducer:Reducer) {
    this.reducers[reducerName] = reducer;
  }

  /**
   * Returns all of the generated reducers, 
   * so they can be used in redux's combineReducers method
   *
   * @return Map of all generated reducers.
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

/*
const reducerName = 'brands';

bison.registerReducer(reducerName, initialState);

bison.generateAction(reducerName, 'getBrands', api.getBrands);

bison.generateSyncAction(reducerName, 'reset', (state, action => {
  // logika za reset
}));

bison.generateAction(getVocabulary, 'getVocabulary', api.getVocabulary, {
  start: (state, action) => {
    // logika za start
  },
  error: (state, action) => {
    // logika za error
  },
  success: (state, action) => {
    // logika za success
  },
});


////////
// reducers/index.js

const reducers = bison.getAllReducers();

export default combineReducers({
  ...reducers,
  // moar reducers
});
*/