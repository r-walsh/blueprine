import mongoose from 'mongoose';
const { Schema } = mongoose;

const Feature = Schema({
	  name: { type: String, required: true  }
	, feature: { type: String, required: true }
	, mvp: { type: Boolean, required: true  }
	, complete: { type: Boolean, default: false }
});

export default mongoose.model(`Feature`, Feature);

// import Sequelize from 'sequelize';
//
// export default sequelize => {
// 	const Feature = sequelize.define(`feature`, {
// 		feature: { type: Sequelize.TEXT, allowNull: false }
// 		, mvp: { type: Sequelize.BOOLEAN, allowNull: false }
// 		, complete: { type: Sequelize.BOOLEAN, defaultValue: false }
// 		, uuid: { type: Sequelize.UUID, primaryKey: true }
// 	} );
//	
// 	return Feature;
// }