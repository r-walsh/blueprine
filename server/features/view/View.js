import mongoose from 'mongoose';
const { Schema } = mongoose;

const View = Schema( {
	  name: { type: String, required: true }
	, description: { type: String, required: true }
	, mvp: { type: Boolean, required: true }
	, complete: { type: Boolean, default: false }
	, features: [{ type: Schema.Types.ObjectId, ref: `Feature` }]
	, endpoints: [{ type: Schema.Types.ObjectId, ref: `Endpoint` }]
} );

export default mongoose.model( `View`, View );