import { Map, fromJS } from 'immutable';

const initialState = Map({
	  loggedIn: false
	, user: Map({
		_id: null
	})
});

const SET_USER = `user/SET_USER`;
const LOGOUT = `user/LOGOUT`;

export default function( state = initialState, action ) {
	switch( action.type ) {
		case SET_USER:
			let nextState = state.set( `loggedIn`, true );
			return nextState.set( `user`, action.user );
		case LOGOUT:
			return initialState
	}
	return state;
}

export function setUser( user ) {
	return { type: SET_USER, user: fromJS( user ) };
}

export function logout() {
	return { type: LOGOUT };
}