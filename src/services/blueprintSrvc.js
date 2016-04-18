import request from 'superagent';
import store from '../store';
import { setBlueprints, selectBlueprint } from '../ducks/blueprint';
import { togglePlanningItemModal } from '../ducks/modal';

export default class BlueprintSrvc {
	static postBlueprint( blueprint, resolve, reject ) {
		return request.post(`/api/blueprints`)
			.send( blueprint )
			.end( ( err, blueprint ) => {
				if ( err ) {
					return reject( err );
				}
				return resolve( blueprint.body );
			});
	}

	static getBlueprintById( blueprintId, resolve, reject ) {
		return request.get(`/api/blueprint/${ blueprintId }`, ( err, blueprint ) => {
			if ( err ) {
				return reject( err );
			}

			store.dispatch( selectBlueprint( blueprint.body ) );
			resolve(blueprint.body);
		});
	}

	static getBlueprints() {
		return request.get(`/api/blueprints`, ( err, blueprints ) => {
			if ( err ) {
				return console.error( err );
			}

			return store.dispatch( setBlueprints( blueprints.body.owned, blueprints.body.shared));
		});
	}

	static checkCompletion( planningItem ) {
		let numberCompleted = 0;

		planningItem.forEach( item => {
			if ( item.complete ) {
				numberCompleted++;
			}
		});

		return numberCompleted;
	}

	static updateTopLevel( changed, newValue, blueprintId ) {
		request.put(`/api/blueprint/${ blueprintId }`)
			.send({
				  changed
				, newValue
			})
			.end( ( err, blueprint ) => {
				if ( err ) {
					return console.error( err );
				}

				return store.dispatch( selectBlueprint( blueprint ) );
			});
	}
	
	static postItem( feature, blueprint, itemType ) {
		request.post(`/api/planningItems`)
			.send({
				  feature
				, blueprint
				, itemType
			})
			.end( ( err, blueprint ) => {
				if ( err ) {
					return console.error( err );
				}

				store.dispatch( togglePlanningItemModal( false, null, {} ) );
				return store.dispatch( selectBlueprint( blueprint.body ) );
			});
	}

	static updateFeature( item, blueprint, itemType ) {
		request.put( `/api/planningItems` )
			.send({
				  item
				, blueprint
				, itemType
			})
			.end( ( err, blueprint ) => {
				if ( err ) {
					return console.error( err );
				}

				store.dispatch( togglePlanningItemModal( false, null, {} ) );
				return store.dispatch( selectBlueprint( blueprint.body ) );
			});
	}
	
	static toggleCompletion( completion, itemType, id, blueprint ) {
		request.put( `/api/planningItems/completion` )
			.send({
				  blueprint
				, completion
				, itemType
				, id
			})
			.end( ( err, blueprint ) => {
				if ( err ) {
					return console.error( err );
				}

				return store.dispatch( selectBlueprint( blueprint.body ) );
			});
	}
}