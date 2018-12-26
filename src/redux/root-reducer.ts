import { combineReducers } from 'redux';

import spark from '../spark';

export default combineReducers({
  ...spark.getAllReducers(),
});