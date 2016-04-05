import { postBlueprint, getUserBlueprints, getBlueprintById, updateTopLevel } from './blueprintCtrl';

export default app => {
	app.route(`/api/blueprints`)
		.post( postBlueprint )
		.get( getUserBlueprints );

	app.route(`/api/blueprint/:blueprintId`)
		.get( getBlueprintById )
		.put( updateTopLevel );
}