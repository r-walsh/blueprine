import { postBlueprint, getUserBlueprints, getBlueprintById } from './blueprintCtrl';

export default app => {
	app.route(`/api/blueprints`)
		.post( postBlueprint )
		.get( getUserBlueprints )

	app.route(`/api/blueprint/:blueprintId`)
		.get( getBlueprintById )
}