import request from 'superagent';

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

	static getBlueprints( resolve, reject ) {
		return request.get(`/api/blueprints`, ( err, blueprints ) => {
			if ( err ) {
				return reject(err);
			}

			return resolve({
				  recent: blueprints.body.length > 0 ? blueprints.body.splice(0, 2) : null
				, blueprints: blueprints.body
			});
		});
	}
}