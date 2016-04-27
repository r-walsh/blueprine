import Blueprint from './Blueprint';
import Feature from '../feature/Feature';
import View from '../view/View';
import Model from '../model/Model';
import Endpoint from '../endpoint/Endpoint';

const planningItems = {
	  endpoints: Endpoint
	, features: Feature
	, models: Model
	, views: View
};

function savePopulateAndSend( req, res, item ) {
	const shitToPopulate = [
		`features`
		, `views.features`
		, `views.endpoints`
		, `endpoints.models`
		, `models`
	];

	item.save( err => {
		if ( err ) {
			return res.status( 500 ).send( err );
		}

		Blueprint.findById( req.body.blueprint._id, ( err, blueprint ) => {
			if ( err ) {
				return res.status( 500 ).send( err );
			}

			blueprint.deepPopulate( shitToPopulate, ( err, populatedBlueprint ) => {
				if ( err ) {
					return res.status( 500 ).send( err );
				}

				return res.send( populatedBlueprint );
			} );
		} );
	} );
}

export function postBlueprint( req, res ) {
	new Blueprint( req.body )
		.save( ( err, blueprint ) => {
			if ( err ) {
				return res.status( 500 ).send( err );
			}

			req.user.blueprints.owned.push( blueprint );
			req.user.save( err => {
				if ( err ) {
					return res.status( 500 ).send( err );
				}

				return res.send( blueprint );
			} );
		} );
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
	req.user.deepPopulate( shitToPopulate, ( err, user ) => {
		if ( err ) {
			return res.status( 500 ).send( err );
		}
		return res.send( user.blueprints );
	} );
}

export function getBlueprintById( req, res ) {
	Blueprint.findById( req.params.blueprintId, ( err, blueprint ) => {
		if ( err ) {
			return res.status( 500 ).send( err );
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
				return res.status( 500 ).send( err );
			}
			return res.send( populatedBlueprint );
		} );

	} );
}

export function updateTopLevel( req, res ) {
	Blueprint.findById( req.params.blueprintId, ( err, blueprint ) => {
		if ( err ) {
			return res.status( 500 ).send( err );
		}

		blueprint.set( req.body.changed, req.body.newValue )
			.save( ( err, updatedBlueprint ) => {
				if ( err ) {
					return res.status( 500 ).send( err );
				}

				return res.send( updatedBlueprint );
			} );
	} );
}

export function postPlanningItem( req, res ) {
	const shitToPopulate = [
		  `features`
		, `views.features`
		, `views.endpoints`
		, `endpoints.models`
		, `models`
	];

	new planningItems[ req.body.itemType ]( req.body.feature )
		.save( ( err, item ) => {
			if ( err ) {
				return res.status( 500 ).send( err );
			}

			Blueprint.findByIdAndUpdate( req.body.blueprint._id, { $push: { [ req.body.itemType ]: item._id } }, ( err, blueprint ) => {
				if ( err ) {
					return res.status( 500 ).send( err );
				}

				blueprint.save( ( err, savedBlueprint ) => {
					if ( err ) {
						return res.status( 500 ).send( err );
					}

					Blueprint.findById( savedBlueprint._id, ( err, blueprint ) => {
						blueprint.deepPopulate( shitToPopulate, ( err, populatedBlueprint ) => {
							if ( err ) {
								return res.status( 500 ).send( err );
							}
							return res.send( populatedBlueprint );
						} );
					} );
				} );
			} );

		} );
}

export function updatePlanningItem( req, res ) {
	planningItems[ req.body.itemType ].findByIdAndUpdate( req.body.item._id, req.body.item, ( err, item ) => {
		if ( err ) {
			return res.status( 500 ).send( err );
		}

		savePopulateAndSend( req, res, item );

	} );
}

export function updateCompletion( req, res ) {
	planningItems[ req.body.itemType ].findByIdAndUpdate( req.body.id, { $set: { complete: req.body.completion } }, ( err, item ) => {
		if ( err ) {
			return res.status( 500 ).send( err );
		}

		savePopulateAndSend( req, res, item );

	} );
}