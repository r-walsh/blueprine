import { combineReducers } from 'redux';

import auth from './ducks/auth';
import modal from './ducks/modal';
import blueprint from './ducks/blueprint';

export default combineReducers({
	  auth
	, modal
	, blueprint
});