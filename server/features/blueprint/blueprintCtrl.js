import Blueprint from './Blueprint';
import Feature from '../feature/Feature';
import View from '../view/View';
import Model from '../model/Model';
import Endpoint from '../endpoint/Endpoint';

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
		, `blueprints.owned.models`
		, `blueprints.owned.endpoints`
		, `blueprints.shared.features`
		, `blueprints.shared.views.features`
		, `blueprints.shared.views.endpoints`
		, `blueprints.shared.models`
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

		const shitToPopulate = [
			  `features`
			, `views.features`
			, `views.endpoints`
			, `endpoints.models`
			, `models`
		];

		blueprint.deepPopulate( shitToPopulate, ( err, populatedBlueprint ) => {
			if ( err ) {
				return res.status(500).send( err );
			}
			return res.send( populatedBlueprint );
		});

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

export function postFeature( req, res ) {
	new Feature( req.body.feature )
		.save( ( err, feature ) => {
			if ( err ) {
				return res.status(500).send( err );
			}

			Blueprint.findByIdAndUpdate( req.body.blueprint._id , { $push: { features: feature._id } }, ( err, blueprint ) => {
				if ( err ) {
					return res.status(500).send( err );
				}
				console.log(blueprint)

				const shitToPopulate = [
					  `features`
					, `views.features`
					, `views.endpoints`
					, `endpoints.models`
					, `models`
				];

				blueprint.populate( `features`, ( err, populatedBlueprint ) => {
					if ( err ) {
						return res.status(500).send( err );
					}
					console.log(populatedBlueprint)
					return res.send( populatedBlueprint );
				});
			});

		});
}