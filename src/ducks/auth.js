import { Map, List, fromJS } from 'immutable';

const initialState = Map({
	  loggedIn: false
	, user: Map({
		  email: null
		, admin: false
		, mentor: false
		, _id: null
	})
	, errors: List()
});

const SET_USER = `user/SET_USER`;
const SET_ERRORS = `user/SET_ERRORS`;
const LOGOUT = `user/LOGOUT`;

export default ( state = initialState, action ) => {
	switch( action.type ) {
		case SET_USER:
			let nextState = state.set( `loggedIn`, true );
			return nextState.set( `user`, action.user );
		case SET_ERRORS:
			return state.set(`errors`, action.errors);
		case LOGOUT:
			return initialState;
	}
	return state;
}

export function setUser( user ) {
	return { type: SET_USER, user: fromJS( user ) };
}

export function setErrors( errors ) {
	return { type: SET_ERRORS, errors: List.of(...errors) };
}

export function logout() {
	return { type: LOGOUT };
}