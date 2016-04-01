import { Map } from 'immutable';

const initialState = Map({
	blueprintModal: false
});

const TOGGLE_BLUEPRINT_MODAL = `modals/OPEN_BLUEPRINT_MODAL`;

export default ( state = initialState, action ) => {
	switch( action.type ) {
		case TOGGLE_BLUEPRINT_MODAL:
			return state.set( `blueprintModal`, action.status )
	}
	return state;
}

export function toggleBlueprintModal( status ) {
	return { type: TOGGLE_BLUEPRINT_MODAL, status }
}