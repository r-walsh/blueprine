import mongoose from 'mongoose';
import DeepPopulate from 'mongoose-deep-populate';
const { Schema } = mongoose;

const deepPopulate = DeepPopulate( mongoose );

const Blueprint = Schema( {
	  title: { type: String, required: true }
	, description: { type: String, required: true }
	, idea: { type: String, default: `` }
	, users: { type: String, default: `` }
	, features: [ { type: Schema.Types.ObjectId, ref: `Feature` } ]
	, views: [ { type: Schema.Types.ObjectId, ref: `View` } ]
	, endpoints: [ { type: Schema.Types.ObjectId, ref: `Endpoint` } ]
	, models: [ { type: Schema.Types.ObjectId, ref: `Model` } ]
	, editPermissions: [ { type: Schema.Types.ObjectId } ]
}, { timestamps: true } );

Blueprint.plugin( deepPopulate );

export default mongoose.model( `Blueprint`, Blueprint );