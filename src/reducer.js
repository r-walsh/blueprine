import { combineReducers } from 'redux';

import auth from './ducks/auth';
import modal from './ducks/modal';

export default combineReducers({
	  auth
	, modal
});