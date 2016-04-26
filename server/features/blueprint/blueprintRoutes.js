import * as bp from './blueprintCtrl';

export default app => {
	app.route( `/api/blueprints` )
		.post( bp.postBlueprint )
		.get( bp.getUserBlueprints );

	app.route( `/api/blueprint/:blueprintId` )
		.get( bp.getBlueprintById )
		.put( bp.updateTopLevel );

	app.route( `/api/planningItems` )
		.post( bp.postPlanningItem )
		.put( bp.updatePlanningItem );

	app.route( `/api/planningItems/completion` )
		.put( bp.updateCompletion );

};