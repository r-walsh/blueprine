import mongoose from 'mongoose';
import DeepPopulate from 'mongoose-deep-populate';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';

const { Schema } = mongoose;
const deepPopulate = DeepPopulate( mongoose );

const User = Schema( {
	  email: { type: String, required: true, unique: true }
	, password: { type: String, required: true }
	, admin: { type: Boolean, default: false }
	, mentor: { type: Boolean, default: false }
	, blueprints: {
		  owned: [ { type: Schema.Types.ObjectId, ref: `Blueprint` } ]
		, shared: [ { type: Schema.Types.ObjectId, ref: `Blueprint` } ]
	}
} );

User.methods.generateHash = password => hashSync( password, genSaltSync( 8 ), null );

User.methods.validatePassword = function( password ) {
	return compareSync( password, this.password );
};

User.plugin( deepPopulate );

export default mongoose.model( `User`, User );