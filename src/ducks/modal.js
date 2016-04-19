import { Map, fromJS } from 'immutable';

const initialState = Map({
	  blueprintModal: false
	, planningItemModal: Map({
		  toggled: false
		, type: ``
		, item: Map()
	})
	, editModelPropertyModal: Map({
		  toggled: false
		, property: Map()
	})
});

const TOGGLE_BLUEPRINT_MODAL = `modals/OPEN_BLUEPRINT_MODAL`;
const TOGGLE_PLANNING_ITEM_MODAL = `modals/TOGGLE_PLANNING_ITEM_MODAL`;
const TOGGLE_EDIT_MODEL_PROPERTY_MODAL = `modals/TOGGLE_EDIT_MODEL_PROPERTY_MODAL`;

export default ( state = initialState, action ) => {
	switch( action.type ) {
		case TOGGLE_BLUEPRINT_MODAL:
			return state.set( `blueprintModal`, action.status );
		case TOGGLE_PLANNING_ITEM_MODAL:
			return state.set( `planningItemModal`, action.planningItem );
		case TOGGLE_EDIT_MODEL_PROPERTY_MODAL:
			return state.set(`editModelPropertyModal`, action.property );
	}
	return state;
}

export function toggleBlueprintModal( status ) {
	return { type: TOGGLE_BLUEPRINT_MODAL, status }
}

export function togglePlanningItemModal( toggled, type, item ) {
	return {
		  type: TOGGLE_PLANNING_ITEM_MODAL
		, planningItem: fromJS({ toggled, type, item })
	}
}

export function toggleEditModelPropertyModal( toggled, property = {} ) {
	return { type: TOGGLE_EDIT_MODEL_PROPERTY_MODAL, property: fromJS({ toggled, property }) }
}