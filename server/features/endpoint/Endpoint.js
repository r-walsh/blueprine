import mongoose from 'mongoose';
const { Schema } = mongoose;

const Endpoint = Schema({
	  url: { type: String, required: true }
	, mvp: { type: String, required: true }
	, complete: { type: String, default: false }
	, description: { type: String, required: true }
	, schema: { type: Schema.Types.ObjectId, ref: `Schema` }
});

export default mongoose.model(`Endpoint`, Endpoint);



// import Sequelize from 'sequelize';
// import Schema from '../schema/Schema';
//
// export default sequelize => {
// 	const Endpoint = sequelize.define(`endpoint`, {
// 		  url: { type: Sequelize.TEXT, allowNull: false }
// 		, mvp: { type: Sequelize.BOOLEAN, allowNull: false }
// 		, complete: { type: Sequelize.BOOLEAN, defaultValue: false }
// 		, description: { type: Sequelize.TEXT, allowNull: false }
// 		, uuid: { type: Sequelize.UUID, primaryKey: true }
// 	} );
// 	Endpoint.belongsToMany(Schema(sequelize), { through: `schemaEndpoints` });
//
// 	return Endpoint;
// }