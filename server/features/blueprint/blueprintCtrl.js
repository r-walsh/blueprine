import Blueprint from './Blueprint';

export function postBlueprint( req, res ) {
	new Blueprint( req.body )
		.save( ( err, blueprint ) => {
			if ( err ) {
				return res.status(500).send( err );
			}

			req.user.blueprints.push( blueprint );
			req.user.save( ( err, updatedUser ) => {
				if ( err ) {
					return res.status(500).send ( err );
				}

				return res.send( blueprint );
			});
		});
}

export function getUserBlueprints( req, res ) {
	req.user.populate(`blueprints`, ( err, user ) => {
		if ( err ) {
			return res.status(500).send( err );
		}
		return res.send( user.blueprints );
	});
}

export function getBlueprintById( req, res ) {
	Blueprint.findById( req.params.blueprintId, ( err, blueprint ) => {
		if ( err ) {
			return res.status(500).send( err );
		}

		return res.send(blueprint);
	});
}