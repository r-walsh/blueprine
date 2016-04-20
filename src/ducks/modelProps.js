import { List, Map } from 'immutable';

const initialState = List.of(Map({
	  propName: ``
	, _type: ``
	, description: ``
}));

const ADD_PROP = `model/ADD_PROP`;

export default function reducer( state = initialState, action ) {
	switch( action.type ) {
		case ADD_PROP:
			return state.push( action.prop );
	}
	return state;
}

export function addProp( prop ) {
	return { type: ADD_PROP, prop }
}