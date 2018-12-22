import { combineReducers } from 'redux';

import spark from '../generator/spark';

export default combineReducers({
  ...spark.getAllReducers(),
});