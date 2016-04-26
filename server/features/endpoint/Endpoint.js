import mongoose from 'mongoose';
const { Schema } = mongoose;

const Endpoint = Schema( {
	  url: { type: String, required: true }
	, name: { type: String, required: true }
	, mvp: { type: String, required: true }
	, complete: { type: String, default: false }
	, description: { type: String, required: true }
	, model: { type: Schema.Types.ObjectId, ref: `Schema` }
} );

export default mongoose.model( `Endpoint`, Endpoint );