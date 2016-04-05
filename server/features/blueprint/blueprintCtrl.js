import Blueprint from './Blueprint';

export function postBlueprint( req, res ) {
	new Blueprint( req.body )
		.save( ( err, blueprint ) => {
			if ( err ) {
				return res.status(500).send( err );
			}

			req.user.blueprints.owned.push( blueprint );
			req.user.save( ( err, updatedUser ) => {
				if ( err ) {
					return res.status(500).send ( err );
				}

				return res.send( blueprint );
			});
		});
}

export function getUserBlueprints( req, res ) {
	const shitToPopulate = [
		  `blueprints.owned.features`
		, `blueprints.owned.views.features`
		, `blueprints.owned.views.endpoints`
		, `blueprints.owned.schemas`
		, `blueprints.owned.endpoints`
		, `blueprints.shared.features`
		, `blueprints.shared.views.features`
		, `blueprints.shared.views.endpoints`
		, `blueprints.shared.schemas`
		, `blueprints.shared.endpoints`
	];
	req.user.deepPopulate(shitToPopulate, ( err, user ) => {
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

export function updateTopLevel( req, res ) {
	Blueprint.findById( req.params.blueprintId, ( err, blueprint ) => {
		if ( err ) {
			return res.status(500).send( err );
		}

		blueprint.set( req.body.changed, req.body.newValue )
			.save( ( err, updatedBlueprint ) => {
				if ( err ) {
					return res.status(500).send( err );
				}

				return res.send( updatedBlueprint );
			});
	} );
}