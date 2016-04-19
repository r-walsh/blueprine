import { combineReducers } from 'redux';

import auth from './ducks/auth';
import blueprint from './ducks/blueprint';
import modal from './ducks/modal';
import modelProps from './ducks/modelProps';

export default combineReducers({
	  auth
	, blueprint
	, modal
	, modelProps
});