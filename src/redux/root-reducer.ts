import { combineReducers } from 'redux';

import core from "src/generator/core";

import './global';

export default combineReducers({
  ...core.getAllReducers(),
});