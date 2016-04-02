import request from 'superagent';
import store from '../store';
import { setBlueprints } from '../ducks/blueprint';

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

	static getBlueprints() {
		return request.get(`/api/blueprints`, ( err, blueprints ) => {
			if ( err ) {
				return console.error( err );
			}

			return store.dispatch( setBlueprints( blueprints.body.owned, blueprints.body.shared));
		});
	}
}