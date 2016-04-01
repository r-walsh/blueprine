import mongoose from 'mongoose';

const Schema = mongoose.Schema({
	  name: { type: String, required: true }
	, schema: { type: mongoose.Schema.Types.Mixed, required: true }
	, mvp: { type: Boolean, required: true }
	, complete: { type: Boolean, default: false }
});

export default mongoose.model(`Schema`, Schema);

// import Sequelize from 'sequelize';
//
// export default sequelize => {
// 	const Schema = sequelize.define(`schema`, {
// 		name: { type: Sequelize.TEXT, allowNull: false }
// 		, schema: { type: Sequelize.JSON, allowNull: false }
// 		, mvp: { type: Sequelize.BOOLEAN, allowNull: false }
// 		, complete: { type: Sequelize.BOOLEAN, defaultValue: false }
// 		, uuid: { type: Sequelize.UUID, primaryKey: true }
// 	} );
// 	return Schema;
// }