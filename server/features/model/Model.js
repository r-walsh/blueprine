import mongoose from 'mongoose';
const { Schema } = mongoose;

const Model = Schema( {
	  name: { type: String, required: true }
	, model: [ {
		  propName: { type: String, required: true }
		, _type: { type: String, enum: [ `String`, `Number`, `Date`, `Buffer`, `Boolean`, `Mixed`, `ObjectId`, `Array` ] }
		, description: { type: String, required: true }
	} ]
	, mvp: { type: Boolean, required: true }
	, complete: { type: Boolean, default: false }
} );

export default mongoose.model( `Model`, Model );