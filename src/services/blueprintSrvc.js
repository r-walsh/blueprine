import request from 'superagent';

export default class BlueprintSrvc {
	static getBlueprints( resolve, reject ) {
		return request.get(`./assets/blueprints.json`, ( err, blueprints ) => {
			if ( err ) {
				return reject(err);
			}
			return resolve({
				  recent: blueprints.body.splice(0, 2)
				, blueprints: blueprints.body
			})
		});
	}
}