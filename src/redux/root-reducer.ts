import { combineReducers } from 'redux';

import core from '../generator/core';

import './global';

export default combineReducers({
  ...core.getAllReducers(),
});