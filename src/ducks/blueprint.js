import { Map, List, fromJS } from 'immutable';

const initialState = Map( {
	  ownedBlueprints: List()
	, sharedBlueprints: List()
	, selectedBlueprint: Map()
} );

const SET_BLUEPRINTS = `blueprint/SET_BLUEPRINT`;
const ADD_BLUEPRINT = `blueprint/ADD_BLUEPRINT`;
const SELECT_BLUEPRINT = `blueprint/SELECT_BLUEPRINT`;

export default ( state = initialState, action ) => {
	switch( action.type ) {
	case SET_BLUEPRINTS:
		return state.set( `ownedBlueprints`, List.of( ...action.ownedBlueprints ) )
						.set( `sharedBlueprints`, List.of( ...action.sharedBlueprints ) );
	case ADD_BLUEPRINT:
		return state.update( `ownedBlueprints`, blueprints => blueprints.push( action.blueprint ) );
	case SELECT_BLUEPRINT:
		return state.set( `selectedBlueprint`, fromJS( action.blueprint ) );
	}
	return state;
};

export function setBlueprints( ownedBlueprints, sharedBlueprints ) {
	return { type: SET_BLUEPRINTS, ownedBlueprints, sharedBlueprints };
}

export function addBlueprint( blueprint ) {
	return { type: ADD_BLUEPRINT, blueprint };
}

export function selectBlueprint( blueprint ) {
	return { type: SELECT_BLUEPRINT, blueprint };
}