import * as bp from './blueprintCtrl';

export default app => {
	app.route(`/api/blueprints`)
		.post( bp.postBlueprint )
		.get( bp.getUserBlueprints );

	app.route(`/api/blueprint/:blueprintId`)
		.get( bp.getBlueprintById )
		.put( bp.updateTopLevel );
}