import mongoose from 'mongoose';
const { Schema } = mongoose;

const Blueprint = Schema({
	  title: { type: String, required: true }
	, description: { type: String, required: true }
	, idea: { type: String, default: `` }
	, users: { type: String, default: `` }
	, features: [{ type: Schema.Types.ObjectId, ref: `Feature` }]
	, views: [{ type: Schema.Types.ObjectId, ref: `View` }]
	, endpoints: [{ type: Schema.Types.ObjectId, ref: `Endpoint` }]
	, models: [{ type: Schema.Types.ObjectId, ref: `Model` }]
	, editPermissions: [{ type: Schema.Types.ObjectId }]
});

export default mongoose.model(`Blueprint`, Blueprint);




// import Sequelize from 'sequelize';
// import Endpoint from '../endpoint/Endpoint';
// import Feature from '../feature/Feature';
// import Schema from '../schema/Schema';
// import View from '../view/View';
//
// export default sequelize => {
// 	const Blueprint = sequelize.define(`blueprint`, {
// 		  title: { type: Sequelize.TEXT, allowNull: false }
// 		, description: { type: Sequelize.TEXT, allowNull: false }
// 		, idea: { type: Sequelize.TEXT }
// 		, users: { type: Sequelize.TEXT }
// 		, uuid: { type: Sequelize.UUID, primaryKey: true }
// 	} );
//
// 	Blueprint.belongsToMany(Feature(sequelize), { through: `bluePrintFeatures` });
// 	Blueprint.belongsToMany(Endpoint(sequelize), { through: `bluePrintEndpoints` });
// 	Blueprint.belongsToMany(Schema(sequelize), { through: `bluePrintSchemas` });
// 	Blueprint.belongsToMany(View(sequelize), { through: `bluePrintViews` });
//
// 	return Blueprint;
// }