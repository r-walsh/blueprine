import { Map, List, fromJS } from 'immutable';

const initialState = Map({
	  ownedBlueprints: List()
	, sharedBlueprints: List()
});

const SET_BLUEPRINTS = `blueprint/SET_BLUEPRINT`;
const ADD_BLUEPRINT = `blueprint/ADD_BLUEPRINT`;

export default ( state = initialState, action ) => {
	switch( action.type ) {
		case SET_BLUEPRINTS:
			return Map({
				  ownedBlueprints: List.of( ...action.ownedBlueprints )
				, sharedBlueprints: List.of( ...action.sharedBlueprints )
			});

		case ADD_BLUEPRINT:
			return state.update(`ownedBlueprints`, blueprints => blueprints.push( action.blueprint ));
	}
	return state;
}

export function setBlueprints( ownedBlueprints, sharedBlueprints ) {
	return { type: SET_BLUEPRINTS, ownedBlueprints, sharedBlueprints };
}

export function addBlueprint( blueprint ) {
	return { type: ADD_BLUEPRINT, blueprint };
}