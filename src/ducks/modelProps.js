import { List, fromJS } from 'immutable';

const initialState = List();

const ADD_PROP = `model/ADD_PROP`;
const SET_PROPS = `model/SET_PROPS`;

export default function reducer( state = initialState, action ) {
	switch( action.type ) {
	case ADD_PROP:
		return state.push( action.prop );
	case SET_PROPS:
			return action.props;
	}
	return state;
}

export function addProp( prop ) {
	return { type: ADD_PROP, prop: fromJS( prop ) };
}

export function setProps( props ) {
	return { type: SET_PROPS, props: fromJS( props ) };
}