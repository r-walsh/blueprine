import mongoose from 'mongoose';
const { Schema } = mongoose;

const Model = Schema({
	  name: { type: String, required: true }
	, model: [{
		  propName: { type: String, required: true }
		, _type: { type: String, enum: [ `String`, `Number`, `Date`, `Buffer`, `Boolean`, `Mixed`, `ObjectId`, `Array` ] }
		, validators: {
			_ref: {
				  enabled: { type: Boolean, default: false }
				, value: { type: String, required: true }
			}
			, _required: {
				enabled: { type: Boolean, default: false }
				, value: { type: Boolean, default: false }
			}
			, _index: {
				enabled: { type: Boolean, default: false }
				, value: { type: Boolean, default: false }
			}
			, _default: {
				  enabled: { type: Boolean, default: false }
				, value: { type: String, required: true }
			}
			, _enum: {
				enabled: { type: Boolean, default: false }
				, values: []
			}
			, _match: {
				enabled: { type: Boolean, default: false }
				, regex: String
			}
			, _minLength: {
				enabled: { type: Boolean, default: false }
				, _min: Number
			}
			, _maxLength: {
				enabled: { type: Boolean, default: false }
				, _max: Number
			}
			, _min: {
				enabled: { type: Boolean, default: false }
				, _min: Number
			}
			, _max: {
				enabled: { type: Boolean, default: false }
				, _max: Number
			}
		}
	}]
	, mvp: { type: Boolean, required: true }
	, complete: { type: Boolean, default: false }
});

export default mongoose.model(`Model`, Model);