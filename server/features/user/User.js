import mongoose from 'mongoose';
import DeepPopulate from 'mongoose-deep-populate';
import { hashSync, compareSync, genSaltSync } from 'bcrypt';

const { Schema } = mongoose;
const deepPopulate = DeepPopulate(mongoose);

const User = Schema({
	  email: { type: String, required: true, unique: true }
	, password: { type: String, required: true }
	, admin: { type: Boolean, default: false }
	, mentor: { type: Boolean, default: false }
	, blueprints: {
		  owned: [{ type: Schema.Types.ObjectId, ref: `Blueprint` }]
		, shared: [{ type: Schema.Types.ObjectId, ref: `Blueprint` }]
	}
});

User.methods.generateHash = password => {
	return hashSync( password, genSaltSync(8), null );
};

User.methods.validatePassword = function( password ) {
	return compareSync( password, this.password );
};

User.plugin( deepPopulate );

export default mongoose.model(`User`, User);

// import Sequelize from 'sequelize';
// import Blueprint from '../blueprint/Blueprint';
//
// export default sequelize => {
// 	const User = sequelize.define(`user`, {
// 		  email: { type: `citext`, allowNull: false, unique: true }
// 		, password: { type: Sequelize.TEXT, allowNull: false }
// 		, admin: { type: Sequelize.BOOLEAN, defaultValue: false }
// 		, mentor: { type: Sequelize.BOOLEAN, defaultValue: false }
// 		, uuid: { type: Sequelize.UUID, primaryKey: true }
// 	});
//
// 	User.belongsToMany(Blueprint(sequelize), { foreignKey: `email`, through: `SharedView`});
// 	User.belongsToMany(Blueprint(sequelize), { foreignKey: `email`, through: `SharedEdit`});
//
// 	return User;
// }