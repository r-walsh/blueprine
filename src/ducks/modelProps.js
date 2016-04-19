import { List, Map } from 'immutable';

const initialState = List.of(Map({
	  propName: ``
	, _type: ``
	, validators: Map({
		_ref: Map({
			enabled: false
			, value: ``
		})
		, _required: Map({
			enabled: false
			, value: false
		})
		, _index: Map({
			enabled: false
			, value: false
		})
		, _default: Map( {
			enabled: false
			, value: ``
		} )
		, _enum: Map( {
			enabled: false
			, values: List()
		} )
		, _match: Map( {
			enabled: false
			, regex: ``
		} )
		, _minLength: Map( {
			enabled: false
			, min: 0
		} )
		, _maxLength: Map( {
			enabled: false
			, max: 0
		} )
		, _min: Map( {
			enabled: false
			, min: 0
		} )
		, _max: Map( {
			enabled: false
			, max: 0
		} )
	})
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